import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentIdBlogException } from "../../exceptions/blog/empty-blog-id-exception";

export class CommentIdBlog extends ValueObject<CommentIdBlog> {
    private readonly id: string;
    
    
    private constructor(id: string) {
        super();
        
        let valid: boolean = true;
        
        if (!id ) valid = false;
        if (!valid) throw new InvalidCommentIdBlogException("El id no existe");
        
        this.id = Object.freeze(id); //*Esto funciona para que no pueda ser modificado el id
    }

    get commentId(): string {
        return this.id;
    }
    
    equals(obj: CommentIdBlog): boolean {
        return this.id === obj.id;
    }

    public static create(id: string): CommentIdBlog {
        return new CommentIdBlog(id);
    }
}