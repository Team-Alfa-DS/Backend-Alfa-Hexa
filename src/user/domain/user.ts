import { UserRole } from "./enums/role-user.type";
import { UserEmail } from "./value-objects/user-email";
import { UserName } from "./value-objects/user-name";
import { UserPassword } from "./value-objects/user-password";
import { UserPhone } from "./value-objects/user-phone";
import { UserImage } from "./value-objects/user-image";
import { AggregateRoot } from "src/common/domain/aggregate-root";
import { UserId } from "./value-objects/user-id";

export class User extends AggregateRoot<UserId> {
    private email: UserEmail;
    private name: UserName;
    private password: UserPassword;
    private phone: UserPhone;
    private type: UserRole;
    private image?: UserImage;
    
    private constructor (id: UserId, email: UserEmail, name: UserName, password: UserPassword, phone: UserPhone, type: UserRole, image: UserImage) {
        super(id);
        this.email = email;
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.type = type;
        this.image = image;
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

    get Type(): UserRole {
        return this.type;
    }

    get Image(): UserImage {
        return this.image;
    }

    static Create(id: UserId, email: UserEmail, name: UserName, password: UserPassword, phone: UserPhone, type: UserRole, image: UserImage) {
        return new User(id, email, name, password, phone, type, image)
    }

    UpdateEmail(email: UserEmail): void {
        this.email = email;
    }

    UpdateName(name: UserName): void {
        this.name = name;
    }

    UpdatePassword(password: UserPassword): void {
        this.password = password;
    }

    UpdatePhone(phone: UserPhone): void {
        this.phone = phone;
    }

    UpdateType(type: UserRole): void {
        this.type = type;
    }

    UpdateImage(image: UserImage): void {
        this.image = image;
    }
}