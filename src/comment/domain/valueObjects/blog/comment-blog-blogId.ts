import { ValueObject } from "src/common/domain/value-object";
import { EmptyBlogCommentBlogIdException } from "../../exceptions/blog/empty-comment-blog-blogid-exception";

export class BlogCommentBlogId extends ValueObject<BlogCommentBlogId> {
    private readonly blogId: string;
    
    
    private constructor(blogId: string) {
        super();

        if(!blogId) throw new EmptyBlogCommentBlogIdException("El id del blog no puede estar vacío");

        this.blogId = Object.freeze(blogId); //*Esto funciona para que no pueda ser modificado
    }

    get BlogId(): string {
        return this.blogId;
    }
    
    equals(obj: BlogCommentBlogId): boolean {
        return this.blogId === obj.blogId;
    }

    public static create(blogId: string): BlogCommentBlogId {
        return new BlogCommentBlogId(blogId);
    }
}