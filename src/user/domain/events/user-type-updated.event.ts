import { DomainEvent } from "src/common/domain/domain-event";
import { UserId } from "../value-objects/user-id";
import { UserRole } from "../enums/role-user.type";

export class UserTypeUpdated extends DomainEvent {

    protected constructor(
        public id: UserId,
        public type: UserRole
    ) {
        super();
    }

    static create(
        id: UserId,
        type: UserRole
    ): UserTypeUpdated {
        return new UserTypeUpdated(id, type);
    }
}