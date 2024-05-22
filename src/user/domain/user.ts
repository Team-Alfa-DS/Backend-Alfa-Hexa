import { Entity } from "src/common/domain/entity";
import { TypeUser } from "./types/type-user.type";

export class User extends Entity<string> {
    private email: string;
    private name: string;
    private password: string;
    private phone: string;
    private type: TypeUser;
    private image?: string;
    // private comments?: string se necesita crear la entity de comentarios
    // private progress?: string se necesita crear la entity de progreso
    
    private constructor (id: string, email: string, name: string, password: string, phone: string, type: TypeUser, image: string) {
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

    get Type(): TypeUser {
        return this.type;
    }

    get Image(): string {
        return this.image;
    }

    static Create(id: string, email: string, name: string, password: string, phone: string, type: TypeUser) {
        return new User(id, email, name, password, phone, type, null)
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

    UpdateType(type: TypeUser): void {
        this.type = type;
    }

    UpdateImage(image: string): void {
        this.image = image;
    }
}