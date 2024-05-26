import { Body, Controller, Put, Request, UseGuards } from "@nestjs/common";
import { OrmUserRepository } from "../repositories/orm-user.repository";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { OrmUserMapper } from "../mappers/orm-user.mapper";
import { UpdateUserService } from "src/user/application/services/update-user.application.service";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { IEncryptor } from "src/auth/application/encryptor/encryptor.interface";
import { BcryptEncryptor } from "src/auth/infraestructure/encryptor/bcrypt";
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('User')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('user')
export class UserController {

    private userMapper: OrmUserMapper = new OrmUserMapper();
    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper,
        DatabaseSingleton.getInstance()
    );
    private readonly encryptor: IEncryptor = new BcryptEncryptor();
    private transactionHandler = new TransactionHandler(
        DatabaseSingleton.getInstance().createQueryRunner()
    );
    private updateUserService: UpdateUserService;
    
    constructor() {
        this.updateUserService = new UpdateUserService(
            this.userRepository,
            this.transactionHandler,
            this.encryptor
        )
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    updateUser(@Request() req, @Body() data: UpdateUserDto) {
        const dataUser = {id: req.user.tokenUser.id, ...data}
        return this.updateUserService.execute(dataUser);
    }
}