import { Entity } from "src/common/domain/entity";
import { UserRole } from "./enums/role-user.type";
import { Progress } from "src/progress/domain/progress";

export class User extends Entity<string> {
    private email: string;
    private name: string;
    private password: string;
    private phone: string;
    private type: UserRole;
    private image?: string;
    // private comments?: string se necesita crear la entity de comentarios
    private progress?: Progress[]
    
    private constructor (id: string, email: string, name: string, password: string, phone: string, type: UserRole, image: string) {
        super(id);
        this.email = email;
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.type = type;
        this.image = image;
    }

    get Email(): string {
        return this.email;
    }

    get Name(): string {
        return this.name;
    }

    get Password(): string {
        return this.password;
    }

    get Phone(): string {
        return this.phone;
    }

    get Type(): UserRole {
        return this.type;
    }

    get Image(): string {
        return this.image;
    }

    get Progress(): Progress[] {
        return this.progress;
    }

    static Create(id: string, email: string, name: string, password: string, phone: string, type: UserRole, image: string) {
        return new User(id, email, name, password, phone, type, image)
    }

    UpdateEmail(email: string): void {
        this.email = email;
    }

    UpdateName(name: string): void {
        this.name = name;
    }

    UpdatePassword(password: string): void {
        this.password = password;
    }

    UpdatePhone(phone: string): void {
        this.phone = phone;
    }

    UpdateType(type: UserRole): void {
        this.type = type;
    }

    UpdateImage(image: string): void {
        this.image = image;
    }
}