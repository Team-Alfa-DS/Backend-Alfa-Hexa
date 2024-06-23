import { DomainEvent } from "src/common/domain/domain-event";
import { UserId } from "../value-objects/user-id";
import { UserEmail } from "../value-objects/user-email";

export class UserEmailUpdated extends DomainEvent {

    protected constructor(
        public id: UserId,
        public email: UserEmail
    ) {
        super();
    }

    static create(
        id: UserId,
        email: UserEmail
    ): UserEmailUpdated {
        return new UserEmailUpdated(id, email);
    }
}