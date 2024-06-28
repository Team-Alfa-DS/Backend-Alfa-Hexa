import { ValueObject } from "src/common/domain/value-object";
import { EmptyLessonCommentLessonIdException } from "../../exceptions/lesson/empty-comment-lesson-lessonid-exception";

export class LessonCommentLessonId extends ValueObject<LessonCommentLessonId> {
    private readonly lessonId: string;
        
    private constructor(lessonId: string) {
        super();
        if (!lessonId) throw new EmptyLessonCommentLessonIdException("El id de la lección no puede estar vacío");

        this.lessonId = Object.freeze(lessonId); //*Esto funciona para que no pueda ser modificado
    }

    get LessonId(): string {
        return this.lessonId;
    }
    
    equals(obj: LessonCommentLessonId): boolean {
        return this.lessonId === obj.lessonId;
    }

    public static create(lessonId: string): LessonCommentLessonId {
        return new LessonCommentLessonId(lessonId);
    }
}