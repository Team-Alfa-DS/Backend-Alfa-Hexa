import { ValueObject } from "src/common/domain/value-object";
import { InvalidProgressTimeException } from "../exceptions/invalid-progress-time.exception";

export class ProgressTime extends ValueObject<ProgressTime> {
    private readonly time: number;

    private constructor(time: number) {
        super();
        let valid: boolean = true;

        if (!Number.isInteger(time)) valid = false;

        if (!valid) {
            throw new InvalidProgressTimeException(`El time ${time} no es valido`);
        }

        this.time = time;
    }

    get Time() {
        return this.time;
    }

    equals(obj: ProgressTime): boolean {
        return this.time === obj.Time
    }

    static create(time: number): ProgressTime {
        return new ProgressTime(time);
    }
}