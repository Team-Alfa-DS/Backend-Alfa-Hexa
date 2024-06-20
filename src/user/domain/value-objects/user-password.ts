import { ValueObject } from "src/common/domain/value-object";
import { InvalidUserPasswordException } from "../exceptions/invalid-user-password.exception";

export class UserPassword extends ValueObject<UserPassword> {
    private readonly password: string;

    private constructor(password: string) {
        super();
        let valid: boolean = true;
        
        if (!password) valid = false;

        if (!valid) throw new InvalidUserPasswordException(`No existe la contraseña`);

        this.password = password;
    }

    get Password(): string {
        return this.password;
    }

    equals(obj: UserPassword): boolean {
        return this.password === obj.Password;
    }

    static create(password: string): UserPassword {
        return new UserPassword(password);
    }
}