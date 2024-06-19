import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentIdLessonException } from "../../exceptions/lesson/empty-lesson-id-exception";

export class CommentIdLesson extends ValueObject<CommentIdLesson> {
    private readonly id: string;
    
    
    private constructor(id: string) {
        super();
        
        let valid: boolean = true;
        
        if (!id ) valid = false;
        if (!valid) throw new InvalidCommentIdLessonException("El id no existe");
        
        this.id = Object.freeze(id); //*Esto funciona para que no pueda ser modificado el id
    }

    get commentId(): string {
        return this.id;
    }
    
    equals(obj: CommentIdLesson): boolean {
        return this.id === obj.id;
    }

    public static create(id: string): CommentIdLesson {
        return new CommentIdLesson(id);
    }
}