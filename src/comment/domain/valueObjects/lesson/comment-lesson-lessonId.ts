import { ValueObject } from "src/common/domain/value-object";
import { EmptyLessonCommentLessonIdException } from "../../exceptions/lesson/empty-comment-lesson-lessonid-exception";
import { LessonId } from "src/course/domain/value-objects/lesson-id";

export class LessonCommentLessonId extends ValueObject<LessonCommentLessonId> {
    private readonly lessonId: LessonId;
        
    private constructor(lessonId: LessonId) {
        super();
        if (!lessonId) throw new EmptyLessonCommentLessonIdException("El id de la lección no puede estar vacío");

        this.lessonId = lessonId //*Esto funciona para que no pueda ser modificado
    }

    get LessonId(): LessonId {
        return this.lessonId;
    }
    
    equals(obj: LessonCommentLessonId): boolean {
        return this.lessonId.equals(obj.LessonId);
    }

    public static create(lessonId: LessonId): LessonCommentLessonId {
        return new LessonCommentLessonId(lessonId);
    }
}