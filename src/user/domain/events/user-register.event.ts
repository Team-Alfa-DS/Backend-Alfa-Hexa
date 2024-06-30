import { DomainEvent } from "src/common/domain/domain-event";
import { UserId } from "../value-objects/user-id";
import { UserEmail } from "../value-objects/user-email";
import { UserName } from "../value-objects/user-name";
import { UserPassword } from "../value-objects/user-password";
import { UserPhone } from "../value-objects/user-phone";
import { UserType } from "../value-objects/user-type";
import { UserImage } from "../value-objects/user-image";

export class UserRegister extends DomainEvent {

    protected constructor (
        public id: UserId, 
        public email: UserEmail, 
        public name: UserName,
        public password: UserPassword,
        public phone: UserPhone,
        public type: UserType,
        public image: UserImage
    ) {
        super()
    }

    static create(
        id: UserId, 
        email: UserEmail, 
        name: UserName,
        password: UserPassword,
        phone: UserPhone,
        type: UserType,
        image: UserImage
    ): UserRegister {
        return new UserRegister(id, email, name, password, phone, type, image);
    }

}