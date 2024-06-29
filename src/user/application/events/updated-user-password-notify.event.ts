import { EventResponseDto } from "src/common/application/events/dtos/event.response";
import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { IMailer } from "src/common/application/mailer/mailer.interface";
import { DomainEvent } from "src/common/domain/domain-event";
import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { UserPasswordUpdated } from "src/user/domain/events/user-password-updated.event";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";

export class UpdatedUserPasswordNotify implements IEventSubscriber<UserPasswordUpdated> {
    private readonly mailer: IMailer;
    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(mailer: IMailer, userRepository: IUserRepository, transactionHandler: ITransactionHandler) {
        this.mailer = mailer;
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }

    async on(event: UserPasswordUpdated): Promise<Result<EventResponseDto>> {
        const user = await this.userRepository.findUserById(event.id, this.transactionHandler);

        if (!user.isSuccess) return Result.fail(user.Error, user.StatusCode, user.Message);


        await this.mailer.sendUserMail(`Feliz dia ${user.Value.Name.Name} su contraseña ha sido actualizada con exito`, 'Actualizacion de contraseña', user.Value.Email.Email);

        const response: EventResponseDto = {
            user: user.Value.Id.Id,
            event: this.constructor.name,
            data: {}
        }

        return Result.success(response, user.StatusCode);
    }
}