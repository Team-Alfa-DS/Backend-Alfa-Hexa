import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Request, UseGuards } from '@nestjs/common';
import { IEncryptor } from 'src/auth/application/encryptor/encryptor.interface';
import { RegisterUserService } from 'src/auth/application/services/register-user.service';
import { IIdGen } from 'src/common/application/id-gen/id-gen.interface';
import { ITransactionHandler } from 'src/common/domain/transaction-handler/transaction-handler.interface';
import { DatabaseSingleton } from 'src/common/infraestructure/database/database.singleton';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';
import { UuidGen } from 'src/common/infraestructure/id-gen/uuid-gen';
import { OrmUserMapper } from 'src/user/infraestructure/mappers/orm-user.mapper';
import { OrmUserRepository } from 'src/user/infraestructure/repositories/orm-user.repository';
import { BcryptEncryptor } from '../encryptor/bcrypt';
import { LoginUserService } from 'src/auth/application/services/login-user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtGen } from '../jwt-gen/jwt-gen';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { CurrentUserService } from 'src/auth/application/services/current-user.service';
import { JwtAuthGuard } from '../guards/jwt-guard.guard';
import { ForgetUserPasswordDto } from '../dtos/forget-user-password.dto';
import { ForgetUserPasswordService } from 'src/auth/application/services/forget-user-password.service';
import { MailerService } from '@nestjs-modules/mailer';
import { NodeMailer } from 'src/common/infraestructure/mailer/node-mailer';
import { ICodeGen } from 'src/common/application/code-gen/code-gen.interface';
import { CodeGenMath } from 'src/common/infraestructure/code-gen/code-gen-math';
import { ValidateUserCodeDto } from '../dtos/validate-user-code.dto';
import { UserCode } from '../types/user-code.type';
import { ValidateUserCodeService } from 'src/auth/application/services/validate-user-code.service';
import { ChangeUserPasswordDto } from '../dtos/change-user-password.dto';
import { ChangeUserPasswordService } from 'src/auth/application/services/change-user-password.service';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtRequest } from 'src/common/infraestructure/types/jwt-request.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    private userMapper: OrmUserMapper = new OrmUserMapper();
    private readonly jwtGen: JwtGen;
    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper, DatabaseSingleton.getInstance());
    private readonly transactionHandler: ITransactionHandler = new TransactionHandler(
        DatabaseSingleton.getInstance().createQueryRunner()
    );
    private readonly idGenerator: IIdGen = new UuidGen();
    private readonly encryptor: IEncryptor = new BcryptEncryptor();
    private readonly mailer: NodeMailer;
    private readonly codeGenerator: ICodeGen = new CodeGenMath();
    private userCodeList: UserCode[] = [];
    private registerUserService: RegisterUserService;
    private loginUserService: LoginUserService;
    private currentUserService: CurrentUserService;
    private forgetUserPasswordService: ForgetUserPasswordService;
    private validateUserCodeService: ValidateUserCodeService;
    private changeUserPasswordService: ChangeUserPasswordService;

    constructor(private jwtService: JwtService, private mailerService: MailerService) {
        this.jwtGen = new JwtGen(jwtService);
        this.mailer = new NodeMailer(mailerService);
        this.registerUserService = new RegisterUserService(this.userRepository, this.transactionHandler, this.encryptor, this.idGenerator);
        this.loginUserService = new LoginUserService(this.userRepository, this.transactionHandler, this.encryptor, this.jwtGen);
        this.currentUserService = new CurrentUserService(this.userRepository, this.transactionHandler);
        this.forgetUserPasswordService = new ForgetUserPasswordService(this.userRepository, this.transactionHandler, this.mailer);
        this.validateUserCodeService = new ValidateUserCodeService(this.userRepository, this.transactionHandler);
        this.changeUserPasswordService = new ChangeUserPasswordService(this.userRepository, this.transactionHandler, this.encryptor);
    }

    @Post('register')
    async registerUser(@Body() newUser: RegisterUserDto) {
        return (await this.registerUserService.execute(newUser));
    }

    @Post('login')
    async loginUser(@Body() user: LoginUserDto) {
        return (await this.loginUserService.execute(user));
    }

    @ApiBearerAuth('token')
    @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
    @UseGuards(JwtAuthGuard)
    @Get('current')
    async currentUser(@Request() req: JwtRequest) {
        return (await this.currentUserService.execute({id: req.user.tokenUser.id}))
    }

    @Post('forget/password')
    async forgetUserPassword(@Body() user: ForgetUserPasswordDto) {
        const code = this.codeGenerator.genCode();
        const indexUser = this.userCodeList.findIndex(userCode => userCode.email == user.email);
        if (indexUser != -1) {
            this.userCodeList[indexUser].code = code;
        }
        else {
            this.userCodeList.push({email: user.email, code});
        }
        
        return (await this.forgetUserPasswordService.execute({...user, code}))
    }

    @Post('code/validate')
    async validateCode(@Body() validate: ValidateUserCodeDto) {
        const userCode = this.userCodeList.find(userCode => userCode.email == validate.email);
        if (!userCode) throw new HttpException('no se encontro el codigo', HttpStatus.BAD_REQUEST);

        return (await this.validateUserCodeService.execute({...validate, codeSaved: userCode.code}));
    }

    @Put('change/password')
    async changePassword(@Body() newPassword: ChangeUserPasswordDto) {
        const userCode = this.userCodeList.find(userCode => userCode.email == newPassword.email);
        if (!userCode) throw new HttpException('no se encontro el codigo', HttpStatus.BAD_REQUEST);
        const validate = await this.validateUserCodeService.execute({code: newPassword.code, email: newPassword.email, codeSaved: userCode.code})

        if (!validate.isSuccess) {
            throw new HttpException('Codigo incorrecto', HttpStatus.BAD_REQUEST);
        }
        this.userCodeList = this.userCodeList.filter(userCode => userCode.email != newPassword.email);
        return (await this.changeUserPasswordService.execute(newPassword));
    }

}
