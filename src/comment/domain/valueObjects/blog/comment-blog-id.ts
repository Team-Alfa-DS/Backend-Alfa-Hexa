import { ValueObject } from "src/common/domain/value-object";
import { EmptyBlogCommentIdException } from "../../exceptions/blog/empty-comment-blog-id-exception";

export class BlogCommentId extends ValueObject<BlogCommentId> {
    private readonly id: string;
    
    
    private constructor(id: string) {
        super();
        
        let valid: boolean = true;
        
        if (!id ) valid = false;
        if (!valid) throw new EmptyBlogCommentIdException("El id del comentario no existe");
        
        this.id = Object.freeze(id); //*Esto funciona para que no pueda ser modificado el id
    }

    get commentId(): string {
        return this.id;
    }
    
    equals(obj: BlogCommentId): boolean {
        return this.id === obj.id;
    }

    public static create(id: string): BlogCommentId {
        return new BlogCommentId(id);
    }
}