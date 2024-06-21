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
import { ICodeGen } from 'src/common/application/code-gen/code-gen.interface';
import { CodeGenMath } from 'src/common/infraestructure/code-gen/code-gen-math';
import { ValidateUserCodeDto } from '../dtos/validate-user-code.dto';
import { UserCode } from '../types/user-code.type';
import { ValidateUserCodeService } from 'src/auth/application/services/validate-user-code.service';
import { ChangeUserPasswordDto } from '../dtos/change-user-password.dto';
import { ChangeUserPasswordService } from 'src/auth/application/services/change-user-password.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtRequest } from 'src/common/infraestructure/types/jwt-request.type';
import { IService } from 'src/common/application/interfaces/IService';
import { RegisterUserRequest } from 'src/auth/application/dtos/request/register-user.request';
import { RegisterUserResponse } from 'src/auth/application/dtos/response/register-user.response';
import { LoginUserRequest } from 'src/auth/application/dtos/request/login-user.request';
import { LoginUserResponse } from 'src/auth/application/dtos/response/login-user.response';
import { CurrentUserRequest } from 'src/auth/application/dtos/request/current-user.request';
import { CurrentUserResponse } from 'src/auth/application/dtos/response/current-user.response';
import { ForgetUserPasswordRequest } from 'src/auth/application/dtos/request/forget-user-password.request';
import { ForgetUserPasswordResponse } from 'src/auth/application/dtos/response/forget-user-password.response';
import { ValidateUserCodeRequest } from 'src/auth/application/dtos/request/validate-user-code.request';
import { ChangeUserPasswordRequest } from 'src/auth/application/dtos/request/change-user-password.request';
import { ServiceDBLoggerDecorator } from 'src/common/application/aspects/serviceDBLoggerDecorator';
import { OrmAuditRepository } from 'src/common/infraestructure/repository/orm-audit.repository';
import { ChangeUserPasswordResponse } from 'src/auth/application/dtos/response/change-user-password.response';
import { ValidateUserCodeResponse } from 'src/auth/application/dtos/response/validate-user-code.response';
import { MailjetService } from 'nest-mailjet';
import { MailJet } from 'src/common/infraestructure/mailer/mailjet';
import { IMailer } from 'src/common/application/mailer/mailer.interface';
import { ExceptionLoggerDecorator } from 'src/common/application/aspects/exceptionLoggerDecorator';
import { ILogger } from 'src/common/application/logger/logger.interface';
import { NestLogger } from 'src/common/infraestructure/logger/nest-logger';
import { UserEntity } from 'src/user/infraestructure/entities/user.entity';
import { RegisterUserResponseDto } from '../dtos/register-user.response';

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
    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
        DatabaseSingleton.getInstance()
    );
    private readonly idGenerator: IIdGen = new UuidGen();
    private readonly encryptor: IEncryptor = new BcryptEncryptor();
    private readonly mailer: IMailer;
    private readonly codeGenerator: ICodeGen = new CodeGenMath();
    private readonly logger: ILogger = new NestLogger();
    private userCodeList: UserCode[] = [];

    private registerUserService: IService<RegisterUserRequest, RegisterUserResponse>;
    private loginUserService: IService<LoginUserRequest, LoginUserResponse>;
    private currentUserService: IService<CurrentUserRequest, CurrentUserResponse>;
    private forgetUserPasswordService: IService<ForgetUserPasswordRequest, ForgetUserPasswordResponse>;
    private validateUserCodeService: IService<ValidateUserCodeRequest, ValidateUserCodeResponse>;
    private changeUserPasswordService: IService<ChangeUserPasswordRequest, ChangeUserPasswordResponse>;

    constructor(private jwtService: JwtService, private mailerService: MailjetService) {
        this.jwtGen = new JwtGen(jwtService);
        this.mailer = new MailJet(mailerService);

        this.registerUserService = new ExceptionLoggerDecorator(
            new ServiceDBLoggerDecorator(
                new RegisterUserService(this.userRepository, this.transactionHandler, this.encryptor, this.idGenerator),
                this.auditRepository
            ),
            this.logger
        );
        this.loginUserService = new ExceptionLoggerDecorator(
            new LoginUserService(this.userRepository, this.transactionHandler, this.encryptor, this.jwtGen),
            this.logger
        );
        this.currentUserService = new ExceptionLoggerDecorator(
            new CurrentUserService(this.userRepository, this.transactionHandler),
            this.logger
        );
        this.forgetUserPasswordService = new ExceptionLoggerDecorator(
            new ForgetUserPasswordService(this.userRepository, this.transactionHandler, this.mailer),
            this.logger
        );
        this.validateUserCodeService = new ExceptionLoggerDecorator(
            new ValidateUserCodeService(this.userRepository, this.transactionHandler),
            this.logger
        );
        this.changeUserPasswordService = new ExceptionLoggerDecorator(
            new ServiceDBLoggerDecorator(
                new ChangeUserPasswordService(this.userRepository, this.transactionHandler, this.encryptor),
                this.auditRepository
            ),
            this.logger
        );
    }

    @Post('register')
    @ApiCreatedResponse({
        description: 'se registro al usuario correctamente',
        type: RegisterUserResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'No se pudo registrar al usuario. Intente de nuevo'
    })
    async registerUser(@Body() newUser: RegisterUserDto) {
        const request = new RegisterUserRequest(newUser.email, newUser.name, newUser.password, newUser.phone, newUser.type);

        const response = await this.registerUserService.execute(request);
        if (response.isSuccess) return response.Value;
        throw new HttpException(response.Message, response.StatusCode);
    }

    @Post('login')
    @ApiCreatedResponse({
        description: 'A iniciado sesion de manera exitosa',
        //type: UserEntity,
    })
    @ApiBadRequestResponse({
        description: 'Las credenciales son incorrectas. Intente de nuevo'
    })
    async loginUser(@Body() user: LoginUserDto) {
        const request = new LoginUserRequest(user.email, user.password);

        const response = await this.loginUserService.execute(request);
        if (response.isSuccess) return response.Value;
        throw new HttpException(response.Message, response.StatusCode);
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
    @UseGuards(JwtAuthGuard)
    @Get('current')
    @ApiCreatedResponse({
        description: 'Recibe el token y permite saber los datos del usuario',
    })
    @ApiBadRequestResponse({
        description: 'El token es incorrecto. Intente de nuevo'
    })
    async currentUser(@Request() req: JwtRequest) {
        const request = new CurrentUserRequest(req.user.tokenUser.id);

        const response = await this.currentUserService.execute(request);
        if (response.isSuccess) return response.Value;
        throw new HttpException(response.Message, response.StatusCode);
    }

    @Post('forget/password')
    @ApiCreatedResponse({
        description: 'Se ha enviado un codigo de verifiacion al correo ingresado',
        //type: UserEntity,
    })
    @ApiBadRequestResponse({
        description: 'El correo ingresado no coincide con algun usuario. Intente de nuevo'
    })
    async forgetUserPassword(@Body() user: ForgetUserPasswordDto) {
        const code = this.codeGenerator.genCode();
        const indexUser = this.userCodeList.findIndex(userCode => userCode.email == user.email);
        if (indexUser != -1) {
            this.userCodeList[indexUser].code = code;
        }
        else {
            this.userCodeList.push({email: user.email, code});
        }
        const request = new ForgetUserPasswordRequest(user.email, code)

        const response = await this.forgetUserPasswordService.execute(request)
        if (response.isSuccess) return response.Value;
        throw new HttpException(response.Message, response.StatusCode);
    }

    @Post('code/validate')
    @ApiCreatedResponse({
        description: 'se actualizo al usuario correctamente',
    })
    @ApiBadRequestResponse({
        description: 'No se pudo actualizar al usuario. Intente de nuevo'
    })
    async validateCode(@Body() validate: ValidateUserCodeDto) {
        const userCode = this.userCodeList.find(userCode => userCode.email == validate.email);
        if (!userCode) throw new HttpException('no se encontro el codigo', HttpStatus.BAD_REQUEST);

        const request = new ValidateUserCodeRequest(validate.email, validate.code, userCode.code);

        const response = await this.validateUserCodeService.execute(request)
        if (response.isSuccess) return response.Value;
        throw new HttpException(response.Message, response.StatusCode);
    }

    @Put('change/password')
    @ApiCreatedResponse({
        description: 'se cambio la contraseña de manera exitosa',
        type: UserEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se pudo cambiar la contraseña. Intente de nuevo'
    })
    async changePassword(@Body() newPassword: ChangeUserPasswordDto) {
        const userCode = this.userCodeList.find(userCode => userCode.email == newPassword.email);
        if (!userCode) throw new HttpException('no se encontro el codigo', HttpStatus.BAD_REQUEST);

        const requestVal = new ValidateUserCodeRequest(newPassword.email, newPassword.code, userCode.code);
        const validate = await this.validateUserCodeService.execute(requestVal)

        if (!validate.isSuccess) {
            throw new HttpException('Codigo incorrecto', HttpStatus.BAD_REQUEST);
        }
        this.userCodeList = this.userCodeList.filter(userCode => userCode.email != newPassword.email);

        const requestChange = new ChangeUserPasswordRequest(newPassword.email, newPassword.code, newPassword.password);

        const response = await this.changeUserPasswordService.execute(requestChange);
        if (response.isSuccess) return response.Value;
        throw new HttpException(response.Message, response.StatusCode);
    }
}
