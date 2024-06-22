import { DomainEvent } from "src/common/domain/domain-event";
import { UserId } from "../value-objects/user-id";
import { UserPhone } from "../value-objects/user-phone";

export class UserPhoneUpdated extends DomainEvent {

    protected constructor(
        public id: UserId,
        public phone: UserPhone
    ) {
        super();
    }

    static create(
        id: UserId,
        phone: UserPhone
    ): UserPhoneUpdated {
        return new UserPhoneUpdated(id, phone);
    }
}