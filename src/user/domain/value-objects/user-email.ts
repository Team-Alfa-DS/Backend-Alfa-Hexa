import { ValueObject } from "src/common/domain/value-object";
import { InvalidUserEmailException } from "../exceptions/invalid-user-email.exception";

export class UserEmail extends ValueObject<UserEmail> {
    private readonly email: string;

    private constructor(email: string) {
        super();
        let valid: boolean = true
        const regex = /^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

        if (!regex.test(email)) {
            valid = false
        }

        if (!valid) {
            throw new InvalidUserEmailException(`El email ${email} no es valido`);
        }

        this.email = email;
    }

    get Email() {
        return this.email;
    }

    equals(obj: UserEmail): boolean {
        return this.email === obj.Email
    }

    static create(email: string): UserEmail {
        return new UserEmail(email);
    }
}