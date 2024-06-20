import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentBodyException } from "../exceptions/invalid-comment-body-exception";


export class CommentBody extends ValueObject<CommentBody> {
    private readonly body: string;
    
    private constructor(body: string) {
        super();
        
        if ( !body ) throw new InvalidCommentBodyException( "El cuerpo del comentario no existe" );
        
        this.body = Object.freeze(body); //*Esto funciona para que no pueda ser modificado 
    }

    get Body(): string {
        return this.body;
    }
    
    equals(obj: CommentBody): boolean {
        return this.body === obj.body;
    }

    public static create(body: string): CommentBody {
        return new CommentBody(body);
    }
}