import { EventResponseDto } from "src/common/application/events/dtos/event.response";
import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";

import { Result } from "src/common/domain/result-handler/result";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { UserRegister } from "src/user/domain/events/user-register.event";
import { User } from "src/user/domain/user";

export class saveUserEvent implements IEventSubscriber<UserRegister> {
    private readonly odmUserRepository: IOdmUserRepository;

    constructor(odmUserRepository: IOdmUserRepository) {
        this.odmUserRepository = odmUserRepository;
    }

    async on(event: UserRegister): Promise<void> {
        try {
            const user = User.Create(
                event.id,
                event.email,
                event.name,
                event.password,
                event.phone,
                event.type,
                event.image
            );

            await this.odmUserRepository.saveUser(user)
    
        } catch (err) {
            return
        }
    }

}