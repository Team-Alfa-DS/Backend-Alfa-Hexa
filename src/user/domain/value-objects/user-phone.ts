import { ValueObject } from "src/common/domain/value-object";
import { InvalidUserPhoneException } from "../exceptions/invalid-user-phone.exception";

export class UserPhone extends ValueObject<UserPhone> {
    private readonly phone: string;

    private constructor(phone: string) {
        super();
        let valid: boolean = true;
        const regex = /^[0-9]{11}$/

        if (!regex.test(phone)) valid = false;

        if (!valid) throw new InvalidUserPhoneException(`el numero ${phone} no es valido`);
        this.phone = phone;
    }

    get Phone(): string {
        return this.phone;
    }

    equals(obj: UserPhone): boolean {
        return this.phone === obj.Phone;
    }

    static create(phone: string): UserPhone {
        return new UserPhone(phone);
    }
}