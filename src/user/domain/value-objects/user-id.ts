import { ValueObject } from "src/common/domain/value-object";
import { InvalidUserIdException } from "../exceptions/invalid-user-id.exception";

export class UserId extends ValueObject<UserId> {
    private readonly id: string;

    private constructor(id: string) {
        super();
        let valid: boolean = true;

        if (!id) valid = false;
        if (!this.checkUuidValidity(id)) valid = false;

        if (!valid) throw new InvalidUserIdException(`El id no existe`);

        this.id = id;
    }

    private checkUuidValidity(uuid: string): boolean {
        if (uuid.length != 36) return false;
        
        if (uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i) == null) return false;
    
        return true;
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