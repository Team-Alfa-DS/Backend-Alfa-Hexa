import { DomainEvent } from "src/common/domain/domain-event";
import { UserId } from "../value-objects/user-id";
import { UserEmail } from "../value-objects/user-email";
import { UserName } from "../value-objects/user-name";

export class UserRegister extends DomainEvent {

    protected constructor (
        public id: UserId, 
        public email: UserEmail, 
        public name: UserName
    ) {
        super()
    }

    static create(
        id: UserId, 
        email: UserEmail, 
        name: UserName
    ): UserRegister {
        return new UserRegister(id, email, name);
    }

}