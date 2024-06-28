import { ValueObject } from "src/common/domain/value-object";
import { InvalidUserIdException } from "../exceptions/invalid-user-id.exception";

export class UserId extends ValueObject<UserId> {
    private readonly id: string;

    private constructor(id: string) {
        super();
        let valid: boolean = true;

        if (!id) valid = false;

        if (!valid) throw new InvalidUserIdException(`El id no existe`);

        this.id = id;
    }

    get Id(): string {
        return this.id;
    }

    equals(obj: UserId): boolean {
        return this.id === obj.Id;
    }

    static create(id: string): UserId {
        return new UserId(id);
    }
}