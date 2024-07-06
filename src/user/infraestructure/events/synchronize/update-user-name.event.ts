import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { UserEmailUpdated } from "src/user/domain/events/user-email-updated.event";
import { UserNameUpdated } from "src/user/domain/events/user-name-updated.event";

export class UpdateUserNameEvent implements IEventSubscriber<UserNameUpdated> {
    private readonly odmUserRepository: IOdmUserRepository;

    constructor(odmUserRepository: IOdmUserRepository) {
        this.odmUserRepository = odmUserRepository;
    }

    async on(event: UserNameUpdated): Promise<void> {
        const user = await this.odmUserRepository.findUserById(event.id);
        await this.odmUserRepository.updateUserName(event.name, user.Value);
    }

}