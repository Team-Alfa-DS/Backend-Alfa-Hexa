import { ValueObject } from "src/common/domain/value-object";
import { InvalidProgressIdException } from "../exceptions/invalid-progress-id.exception";
import { InvalidProgressUserIdException } from "../exceptions/invalid-progress-userId.exception";
import { InvalidProgressLessonIdException } from "../exceptions/invalid-progress-lessonId.exception";

export class ProgressId extends ValueObject<ProgressId> {
    private readonly userId: string;
    private readonly lessonId: string;

    private constructor(userId: string, lessonId: string) {
        super();
        let valid: boolean = true;

        if (!userId) throw new InvalidProgressUserIdException(`El userId: ${userId} es invalido`);

        if (!lessonId) throw new InvalidProgressLessonIdException(`El lessonId: ${lessonId} es invalido`);

        if (!valid) {
            throw new InvalidProgressIdException(`El userId: ${userId} y/o el lessonId: ${lessonId} son invalidos`);
        }

        this.userId = userId;
        this.lessonId = lessonId;
    }

    get UserId() {
        return this.userId;
    }

    get LessonId() {
        return this.lessonId;
    }

    equals(obj: ProgressId): boolean {
        return this.userId === obj.UserId && this.lessonId === obj.LessonId;
    }

    static create(userId: string, lessonId: string): ProgressId {
        return new ProgressId(userId, lessonId);
    }
}