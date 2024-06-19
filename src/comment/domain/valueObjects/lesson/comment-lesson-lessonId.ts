import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentLessonIdException } from "../../exceptions/lesson/empty-blog-lessonid-exception";

export class CommentLessonId extends ValueObject<CommentLessonId> {
    private readonly lessonId: string;
    
    
    private constructor(lessonId: string) {
        super();

        if (!lessonId) throw new InvalidCommentLessonIdException( "El ID de la leccion no puede estar vacio" );

        this.lessonId = Object.freeze(lessonId); //*Esto funciona para que no pueda ser modificado
    }

    get LessonId(): string {
        return this.lessonId;
    }
    
    equals(obj: CommentLessonId): boolean {
        return this.lessonId === obj.lessonId;
    }

    public static create(lessonId: string): CommentLessonId {
        return new CommentLessonId(lessonId);
    }
}