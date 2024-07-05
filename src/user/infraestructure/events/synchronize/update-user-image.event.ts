import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { UserEmailUpdated } from "src/user/domain/events/user-email-updated.event";
import { UserImageUpdated } from "src/user/domain/events/user-image-updated.event";

export class UpdateUserImageEvent implements IEventSubscriber<UserImageUpdated> {
    private readonly odmUserRepository: IOdmUserRepository;

    constructor(odmUserRepository: IOdmUserRepository) {
        this.odmUserRepository = odmUserRepository;
    }

    async on(event: UserImageUpdated): Promise<void> {
        const user = await this.odmUserRepository.findUserById(event.id)
        await this.odmUserRepository.updateUserImage(event.image, user.Value);
    }

}