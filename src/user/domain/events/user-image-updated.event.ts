import { DomainEvent } from "src/common/domain/domain-event";
import { UserId } from "../value-objects/user-id";
import { UserImage } from "../value-objects/user-image";

export class UserImageUpdated extends DomainEvent {

    protected constructor(
        public id: UserId,
        public image: UserImage
    ) {
        super();
    }

    static create(
        id: UserId,
        image: UserImage
    ): UserImageUpdated {
        return new UserImageUpdated(id, image);
    }
}