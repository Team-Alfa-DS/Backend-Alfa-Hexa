import { Entity } from "src/common/domain/entity";
import { UserRole } from "./enums/role-user.type";
import { Progress } from "src/progress/domain/progress";
import { UserEmail } from "./value-objects/user-email";
import { UserName } from "./value-objects/user-name";
import { UserPhone } from "./value-objects/user-phone";
import { UserImage } from "./value-objects/user-image";

export class User extends Entity<string> {
    private email: UserEmail;
    private name: UserName;
    private phone: UserPhone;
    private image?: UserImage;
    // private comments?: string se necesita crear la entity de comentarios
    private progress?: Progress[]
    
    private constructor (id: string, email: UserEmail, name: UserName, phone: UserPhone, image: UserImage) {
        super(id);
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.image = image;
    }

    get Email(): UserEmail {
        return this.email;
    }

    get Name(): UserName {
        return this.name;
    }

    get Phone(): UserPhone {
        return this.phone;
    }

    get Image(): UserImage {
        return this.image;
    }

    get Progress(): Progress[] {
        return this.progress;
    }

    static Create(id: string, email: UserEmail, name: UserName, phone: UserPhone, image: UserImage) {
        return new User(id, email, name, phone, image)
    }

    UpdateEmail(email: UserEmail): void {
        this.email = email;
    }

    UpdateName(name: UserName): void {
        this.name = name;
    }

    UpdatePhone(phone: UserPhone): void {
        this.phone = phone;
    }

    UpdateImage(image: UserImage): void {
        this.image = image;
    }
}