import { ValueObject } from "src/common/domain/value-object";
import { EmptyLessonCommentIdException } from "../../exceptions/lesson/empty-comment-lesson-id-exception";

export class LessonCommentId extends ValueObject<LessonCommentId> {
    private readonly id: string;
    
    
    private constructor(id: string) {
        super();
        
        let valid: boolean = true;
        
        if (!id ) valid = false;
        if (!valid) throw new EmptyLessonCommentIdException("El id del comentario no existe");
        
        this.id = Object.freeze(id); //*Esto funciona para que no pueda ser modificado el id
    }

    get commentId(): string {
        return this.id;
    }
    
    equals(obj: LessonCommentId): boolean {
        return this.id === obj.id;
    }

    public static create(id: string): LessonCommentId {
        return new LessonCommentId(id);
    }
}