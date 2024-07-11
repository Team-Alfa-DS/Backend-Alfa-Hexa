import { ValueObject } from "../../../../../src/common/domain/value-object";
import { InvalidBlogCommentBodyException } from "../../exceptions/blog/invalid-comment-blog-body-exception";


export class CommentBlogBody extends ValueObject<CommentBlogBody> {
    private readonly body: string;
    
    private constructor(body: string) {
        super();
        
        if ( !body ) throw new InvalidBlogCommentBodyException( "El cuerpo del comentario no existe" );
        
        this.body = Object.freeze(body); //*Esto funciona para que no pueda ser modificado 
    }

    get Body(): string {
        return this.body;
    }
    
    equals(obj: CommentBlogBody): boolean {
        return this.body === obj.body;
    }

    public static create(body: string): CommentBlogBody {
        return new CommentBlogBody(body);
    }
}