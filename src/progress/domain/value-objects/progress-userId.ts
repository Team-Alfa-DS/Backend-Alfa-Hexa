import { ValueObject } from "src/common/domain/value-object";
import { InvalidProgressUserIdException } from "../exceptions/invalid-progress-userId.exception";

export class ProgressUserId extends ValueObject<ProgressUserId> {
    private readonly userId: string;

    private constructor(userId: string) {
        super();
        let valid: boolean = true;

        if (!valid) {
            throw new InvalidProgressUserIdException(`El userId ${userId} no es valido`);
        }

        this.userId = userId;
    }

    get UserId() {
        return this.userId;
    }

    equals(obj: ProgressUserId): boolean {
        return this.userId === obj.UserId
    }

    static create(userId: string): ProgressUserId {
        return new ProgressUserId(userId);
    }
}