import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { UserEmailUpdated } from "src/user/domain/events/user-email-updated.event";
import { UserNameUpdated } from "src/user/domain/events/user-name-updated.event";
import { UserPasswordUpdated } from "src/user/domain/events/user-password-updated.event";
import { UserPhoneUpdated } from "src/user/domain/events/user-phone-updated.event";

export class UpdateUserPhoneEvent implements IEventSubscriber<UserPhoneUpdated> {
    private readonly odmUserRepository: IOdmUserRepository;

    constructor(odmUserRepository: IOdmUserRepository) {
        this.odmUserRepository = odmUserRepository;
    }

    async on(event: UserPhoneUpdated): Promise<void> {
        const user = await this.odmUserRepository.findUserById(event.id)
        await this.odmUserRepository.updateUserPhone(event.phone, user.Value);
    }

}