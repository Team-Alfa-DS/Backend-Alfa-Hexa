import { EventResponseDto } from "src/common/application/events/dtos/event.response";
import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { IMailer } from "src/common/application/mailer/mailer.interface";
import { Result } from "src/common/domain/result-handler/result";
import { UserRegister } from "src/user/domain/events/user-register.event";

export class RegisterUserNotify implements IEventSubscriber<UserRegister> {
    private readonly mailer: IMailer;

    constructor(mailer: IMailer) {
        this.mailer = mailer;
    }

    async on(event: UserRegister): Promise<void> {

        await this.mailer.sendUserMail(`Bienvenido ${event.name.Name}`, 'Creacion de cuenta', event.email.Email);

    }
}