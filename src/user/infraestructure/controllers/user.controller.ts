/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, FileTypeValidator, HttpException, ParseFilePipe, Put, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { OrmUserRepository } from "../repositories/orm-user.repository";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { OrmUserMapper } from "../mappers/orm-mappers/orm-user.mapper";
import { UpdateUserService } from "src/user/application/services/update-user.application.service";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { IEncryptor } from "src/auth/application/encryptor/encryptor.interface";
import { BcryptEncryptor } from "src/auth/infraestructure/encryptor/bcrypt";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtRequest } from "src/common/infraestructure/types/jwt-request.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { IService } from "src/common/application/interfaces/IService";
import { UpdateUserRequest } from "src/user/application/dtos/request/update-user.request";
import { UpdateUserResponse } from "src/user/application/dtos/response/update-user.response";
import { ServiceDBLoggerDecorator } from "src/common/application/aspects/serviceDBLoggerDecorator";
import { OrmAuditRepository } from "src/common/infraestructure/repository/orm-audit.repository";
import { ILogger } from "src/common/application/logger/logger.interface";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { ExceptionLoggerDecorator } from "src/common/application/aspects/exceptionLoggerDecorator";
import { UpdateUserResponseDto } from "../dtos/UpdateUserResponse.response";
import { HttpResponseHandler } from "src/common/infraestructure/handlers/http-response.handler";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { EventBus } from "src/common/infraestructure/events/event-bus";
import { IMailer } from "src/common/application/mailer/mailer.interface";
import { MailjetService } from "nest-mailjet";
import { MailJet } from "src/common/infraestructure/mailer/mailjet";
import { UpdatedUserPasswordNotify } from "src/user/application/events/updated-user-password-notify.event";
import { EventManagerSingleton } from "src/common/infraestructure/events/event-manager/event-manager-singleton";

@ApiTags('User')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('user')
export class UserController {

    private userMapper: OrmUserMapper = new OrmUserMapper();
    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper,
        PgDatabaseSingleton.getInstance()
    );
    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
        PgDatabaseSingleton.getInstance()
    );

    private readonly encryptor: IEncryptor = new BcryptEncryptor();
    private transactionHandler = new TransactionHandler(
        PgDatabaseSingleton.getInstance().createQueryRunner()
    );
    private readonly logger: ILogger = new NestLogger();
    private readonly eventPublisher: IEventPublisher = EventManagerSingleton.getInstance();
    private readonly mailer: IMailer;
    private updateUserService: IService<UpdateUserRequest, UpdateUserResponse>;
    
    constructor(private mailerService: MailjetService) {
        this.mailer = new MailJet(mailerService);
        this.eventPublisher.subscribe('UserPasswordUpdated', [new UpdatedUserPasswordNotify(this.mailer, this.userRepository, this.transactionHandler)]);

        this.updateUserService = new ExceptionLoggerDecorator(
            new ServiceDBLoggerDecorator(
                new UpdateUserService(
                    this.userRepository,
                    this.transactionHandler,
                    this.encryptor,
                    this.eventPublisher
                ),
                this.auditRepository
            ),
            this.logger
        );
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    @ApiCreatedResponse({
        description: 'se actualizo al usuario correctamente',
        type: UpdateUserResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'No se pudo actualizar al usuario. Intente de nuevo'
    })
    async updateUser(@Request() req: JwtRequest, @Body() data: UpdateUserDto) {
        const dataUser = new UpdateUserRequest(
            req.user.tokenUser.id,
            data.name,
            data.email,
            data.password,
            data.phone,
            data.image
        )
        const result = await this.updateUserService.execute(dataUser);
        if (result.isSuccess) return result.Value;
        HttpResponseHandler.HandleException(result.StatusCode, result.Message, result.Error);
    }
}