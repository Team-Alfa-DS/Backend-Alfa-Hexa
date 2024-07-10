import { ValueObject } from "src/common/domain/value-object";
import { EmptyBlogCommentBlogIdException } from "../../exceptions/blog/empty-comment-blog-blogid-exception";
import { BlogId } from "src/blog/domain/valueObjects/blogId";

export class BlogCommentBlogId extends ValueObject<BlogCommentBlogId> {
    private readonly blogId: BlogId;
    
    
    private constructor(blogId: BlogId) {
        

        if(!blogId) throw new EmptyBlogCommentBlogIdException("El id del blog no puede estar vacío");

        super();
        this.blogId = blogId //*Esto funciona para que no pueda ser modificado
    }

    get BlogId(): BlogId {
        return this.blogId;
    }
    
    equals(obj: BlogCommentBlogId): boolean {
        return this.blogId === obj.blogId;
    }

    public static create(blogId: BlogId): BlogCommentBlogId {
        return new BlogCommentBlogId(blogId);
    }
}