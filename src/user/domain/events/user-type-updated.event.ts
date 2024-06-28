import { DomainEvent } from "src/common/domain/domain-event";
import { UserId } from "../value-objects/user-id";
import { UserType } from "../value-objects/user-type";

export class UserTypeUpdated extends DomainEvent {

    protected constructor(
        public id: UserId,
        public type: UserType
    ) {
        super();
    }

    static create(
        id: UserId,
        type: UserType
    ): UserTypeUpdated {
        return new UserTypeUpdated(id, type);
    }
}