import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentLessonBodyException } from "../../exceptions/lesson/invalid-comment-lesson-body-exception";


export class CommentLessonBody extends ValueObject<CommentLessonBody> {
    private readonly body: string;
    
    private constructor(body: string) {
        super();
        
        if ( !body ) throw new InvalidCommentLessonBodyException( "El cuerpo del comentario no existe" );
        
        this.body = Object.freeze(body); //*Esto funciona para que no pueda ser modificado 
    }

    get Body(): string {
        return this.body;
    }
    
    equals(obj: CommentLessonBody): boolean {
        return this.body === obj.body;
    }

    public static create(body: string): CommentLessonBody {
        return new CommentLessonBody(body);
    }
}