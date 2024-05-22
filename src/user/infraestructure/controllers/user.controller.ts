import { Body, Controller, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import { UpdateUserDto } from "src/user/application/dtos/update-user.dto";
import { OrmUserRepository } from "../repositories/orm-user.repository";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { DataSourceSingleton } from "src/common/infraestructure/database/config";
import { OrmUserMapper } from "../mappers/orm-user.mapper";
import { UpdateUserService } from "src/user/application/services/update-user.application.service";

@Controller('user')
export class UserController {

    private userMapper: OrmUserMapper = new OrmUserMapper();
    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper,
        DataSourceSingleton.getInstance()
    );
    private transactionHandler = new TransactionHandler(
        DataSourceSingleton.getInstance().createQueryRunner()
    );
    private updateUserService: UpdateUserService;
    
    constructor() {
        this.updateUserService = new UpdateUserService(
            this.userRepository,
            this.transactionHandler
        )
    }

    @Put('update/:id')
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateUserDto) {
        const dataUser = {id, ...data}
        return this.updateUserService.execute(dataUser);
    }
}