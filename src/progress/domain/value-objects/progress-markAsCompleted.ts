import { ValueObject } from "src/common/domain/value-object";
import { InvalidProgressMarkAsCompletedException } from "../exceptions/invalid-progress-markAsCompleted.exception";

export class ProgressMarkAsCompleted extends ValueObject<ProgressMarkAsCompleted> {
    private readonly markAsCompleted: boolean;

    private constructor(markAsCompleted: boolean) {
        super();
        let valid: boolean = true

        if (!valid) {
            throw new InvalidProgressMarkAsCompletedException(`El markAsCompleted no es valido`);
        }

        this.markAsCompleted = markAsCompleted;
    }

    get MarkAsCompleted() {
        return this.markAsCompleted;
    }

    equals(obj: ProgressMarkAsCompleted): boolean {
        return this.markAsCompleted === obj.MarkAsCompleted
    }

    static create(markAsCompleted: boolean): ProgressMarkAsCompleted {
        return new ProgressMarkAsCompleted(markAsCompleted);
    }
}