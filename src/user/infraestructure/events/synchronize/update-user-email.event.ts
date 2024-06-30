import { EventResponseDto } from "src/common/application/events/dtos/event.response";
import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { Result } from "src/common/domain/result-handler/result";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { UserEmailUpdated } from "src/user/domain/events/user-email-updated.event";

export class UpdateUserEmailEvent implements IEventSubscriber<UserEmailUpdated> {
    private readonly odmUserRepository: IOdmUserRepository;

    constructor(odmUserRepository: IOdmUserRepository) {
        this.odmUserRepository = odmUserRepository;
    }

    on(event: UserEmailUpdated): Promise<Result<EventResponseDto>> {
        throw new Error("Method not implemented.");
    }

}