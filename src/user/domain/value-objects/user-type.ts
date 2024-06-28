import { ValueObject } from "src/common/domain/value-object";
import { UserRole } from "../enums/role-user.type";
import { InvalidUserTypeException } from "../exceptions/invalid-user-type.exception";

export class UserType extends ValueObject<UserType> {
    private readonly type: UserRole;

    private constructor(type: UserRole) {
        super();
        let valid: boolean = true;
        if (!type) throw new InvalidUserTypeException(`El nombre esta vacio`);

        if (!Object.values(UserRole).includes(type)) {
            valid = false;
        }

        if (!valid) throw new InvalidUserTypeException(`El type ${type} no es valido`);
        this.type = type
    }

    get Type(): string {
        return this.type
    }

    equals(obj: UserType): boolean {
        return this.type === obj.Type;
    }

    static create(type: UserRole): UserType {
        return new UserType(type);
    }
}