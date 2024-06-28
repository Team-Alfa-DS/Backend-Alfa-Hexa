import { DomainEvent } from "src/common/domain/domain-event";
import { UserId } from "../value-objects/user-id";
import { UserPassword } from "../value-objects/user-password";

export class UserPasswordUpdated extends DomainEvent {

    protected constructor(
        public id: UserId,
        public password: UserPassword
    ) {
        super();
    }

    static create(
        id: UserId,
        password: UserPassword
    ): UserPasswordUpdated {
        return new UserPasswordUpdated(id, password);
    }
}