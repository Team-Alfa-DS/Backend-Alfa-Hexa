import { Body, Controller, Post } from '@nestjs/common';
import { IEncryptor } from 'src/auth/application/encryptor/encryptor.interface';
import { RegisterUserService } from 'src/auth/application/services/register-user.service';
import { IIdGen } from 'src/common/application/id-gen/id-gen.interface';
import { ITransactionHandler } from 'src/common/domain/transaction-handler/transaction-handler.interface';
import { DataSourceSingleton } from 'src/common/infraestructure/database/config';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';
import { UuidGen } from 'src/common/infraestructure/id-gen/uuid-gen';
import { IUserRepository } from 'src/user/domain/repositories/user-repository.interface';
import { OrmUserMapper } from 'src/user/infraestructure/mappers/orm-user.mapper';
import { OrmUserRepository } from 'src/user/infraestructure/repositories/orm-user.repository';
import { BcryptEncryptor } from '../encryptor/bcrypt';
import { RegisterUserDto } from 'src/auth/application/dtos/register-user.dto';

@Controller('auth')
export class AuthController {

    private userMapper: OrmUserMapper = new OrmUserMapper();
    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper, DataSourceSingleton.getInstance());
    private readonly transactionHandler: ITransactionHandler = new TransactionHandler(
        DataSourceSingleton.getInstance().createQueryRunner()
    );
    private readonly idGenerator: IIdGen = new UuidGen();
    private readonly encryptor: IEncryptor = new BcryptEncryptor();
    private registerUserService: RegisterUserService;

    constructor() {
        this.registerUserService = new RegisterUserService(this.userRepository, this.transactionHandler, this.encryptor, this.idGenerator);
    }

    @Post('register')
    registerUser(@Body() newUser: RegisterUserDto) {
        return this.registerUserService.execute(newUser);
    }

}
