import { UserRole } from "./enums/role-user.type";
import { UserEmail } from "./value-objects/user-email";
import { UserName } from "./value-objects/user-name";
import { UserPassword } from "./value-objects/user-password";
import { UserPhone } from "./value-objects/user-phone";
import { UserImage } from "./value-objects/user-image";
import { AggregateRoot } from "src/common/domain/aggregate-root";
import { UserId } from "./value-objects/user-id";
import { UserCreated } from "./events/user-created.event";
import { DomainEvent } from "src/common/domain/domain-event";
import { InvalidUserException } from "./exceptions/invalid-user.exception";
import { UserEmailUpdated } from "./events/user-email-updated.event";
import { UserNameUpdated } from "./events/user-name-updated.event";
import { UserPasswordUpdated } from "./events/user-password-updated.event";
import { UserPhoneUpdated } from "./events/user-phone-updated.event";
import { UserTypeUpdated } from "./events/user-type-updated.event";
import { UserImageUpdated } from "./events/user-image-updated.event";
import { UserType } from "./value-objects/user-type";

export class User extends AggregateRoot<UserId> {
    private email: UserEmail;
    private name: UserName;
    private password: UserPassword;
    private phone: UserPhone;
    private type: UserType;
    private image?: UserImage;
    
    private constructor (id: UserId, email: UserEmail, name: UserName, password: UserPassword, phone: UserPhone, type: UserType, image: UserImage) {
        const userCreated = UserCreated.create(id, email, name, password, phone, type, image)
        super(id, userCreated);
    }

    protected when(event: DomainEvent): void {
        if (event instanceof UserCreated) {
            this.email = event.email;
            this.name = event.name;
            this.password = event.password;
            this.phone = event.phone;
            this.type = event.type;
            this.image = event.image;
        }

        if (event instanceof UserEmailUpdated) {
            this.email = event.email;
        }

        if (event instanceof UserNameUpdated) {
            this.name = event.name;
        }

        if (event instanceof UserPasswordUpdated) {
            this.password = event.password;
        }

        if (event instanceof UserPhoneUpdated) {
            this.phone = event.phone;
        }

        if (event instanceof UserTypeUpdated) {
            this.type = event.type;
        }

        if (event instanceof UserImageUpdated) {
            this.image = event.image;
        }
    }

    protected validateState(): void {
        if (!this.email || !this.name || !this.password || !this.phone || !this.type) throw new InvalidUserException('El usuario no es valido');
    }

    get Email(): UserEmail {
        return this.email;
    }

    get Name(): UserName {
        return this.name;
    }

    get Password(): UserPassword {
        return this.password;
    }

    get Phone(): UserPhone {
        return this.phone;
    }

    get Type(): UserType {
        return this.type;
    }

    get Image(): UserImage {
        return this.image;
    }

    static Create(id: UserId, email: UserEmail, name: UserName, password: UserPassword, phone: UserPhone, type: UserType, image: UserImage) {
        return new User(id, email, name, password, phone, type, image)
    }

    UpdateEmail(email: UserEmail): void {
        this.apply(UserEmailUpdated.create(this.Id, email));
    }

    UpdateName(name: UserName): void {
        this.apply(UserNameUpdated.create(this.Id, name));
    }

    UpdatePassword(password: UserPassword): void {
        this.apply(UserPasswordUpdated.create(this.Id, password));
    }

    UpdatePhone(phone: UserPhone): void {
        this.apply(UserPhoneUpdated.create(this.Id, phone));
    }

    UpdateType(type: UserType): void {
        this.apply(UserTypeUpdated.create(this.Id, type));
    }

    UpdateImage(image: UserImage): void {
        this.apply(UserImageUpdated.create(this.Id, image));
    }
}