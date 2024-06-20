import { ValueObject } from "src/common/domain/value-object";
import { InvalidProgressUserIdException } from "../exceptions/invalid-progress-userId.exception";

export class ProgressLessonId extends ValueObject<ProgressLessonId> {
    private readonly lessonId: string;

    private constructor(lessonId: string) {
        super();
        let valid: boolean = true;

        if (!valid) {
            throw new InvalidProgressUserIdException(`El userId ${lessonId} no es valido`);
        }

        this.lessonId = lessonId;
    }

    get LessonId() {
        return this.lessonId;
    }

    equals(obj: ProgressLessonId): boolean {
        return this.lessonId === obj.LessonId
    }

    static create(lessonId: string): ProgressLessonId {
        return new ProgressLessonId(lessonId);
    }
}