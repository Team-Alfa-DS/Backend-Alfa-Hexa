import { ValueObject } from "src/common/domain/value-object";
import { InvalidUserNameException } from "../exceptions/invalid-user-name.exception";

export class UserName extends ValueObject<UserName> {
    private readonly name: string;

    private constructor(name: string) {
        super();
        let valid: boolean = true;
        if (!name) throw new InvalidUserNameException(`El nombre esta vacio`);

        if (name.length < 3 || name.length > 50) {
            valid = false;
        }

        if (!valid) throw new InvalidUserNameException(`El nombre ${name} no es valido`);
        this.name = name
    }

    get Name(): string {
        return this.name
    }

    equals(obj: UserName): boolean {
        return this.name === obj.Name;
    }

    static create(name: string): UserName {
        return new UserName(name);
    }
}