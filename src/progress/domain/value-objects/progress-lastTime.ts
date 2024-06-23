import { ValueObject } from "src/common/domain/value-object";
import { InvalidProgressLastTimeException } from "../exceptions/invalid-progress-lastTime.exception";

export class ProgressLastTime extends ValueObject<ProgressLastTime> {
    private readonly lastTime: Date;

    private constructor(lastTime: Date) {
        super();
        let valid: boolean = true;

        if (!valid) {
            throw new InvalidProgressLastTimeException(`El lastTime ${lastTime} no es valido`);
        }

        this.lastTime = lastTime;
    }

    get LastTime() {
        return this.lastTime;
    }

    equals(obj: ProgressLastTime): boolean {
        return this.lastTime === obj.lastTime
    }

    static create(lastTime: Date): ProgressLastTime {
        return new ProgressLastTime(lastTime);
    }
}