import { ValueObject } from "src/common/domain/value-object";

export class CommentBlogId extends ValueObject<CommentBlogId> {
    private readonly blogId: string;
    
    
    private constructor(blogId: string) {
        super();

        this.blogId = Object.freeze(blogId); //*Esto funciona para que no pueda ser modificado
    }

    get BlogId(): string {
        return this.blogId;
    }
    
    equals(obj: CommentBlogId): boolean {
        return this.blogId === obj.blogId;
    }

    public static create(blogId: string): CommentBlogId {
        return new CommentBlogId(blogId);
    }
}