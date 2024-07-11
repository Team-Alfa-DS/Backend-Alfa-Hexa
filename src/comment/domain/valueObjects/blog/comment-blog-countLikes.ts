import { ValueObject } from "../../../../../src/common/domain/value-object";

export class CommentBlogCountLike extends ValueObject<CommentBlogCountLike> {
    private readonly countLike: number;
    
    
    private constructor(countLike: number) {
        super();
        this.countLike = Object.freeze(countLike); //*Esto funciona para que no pueda ser modificado
    }

    get CountLike(): number {
        return this.countLike;
    }
    
    equals(obj: CommentBlogCountLike): boolean {
        return this.countLike === obj.countLike;
    }

    public static create(countLike: number): CommentBlogCountLike {
        return new CommentBlogCountLike(countLike);
    }
}