import { ValueObject } from "../../../../../src/common/domain/value-object";

export class CommentBlogCountDislike extends ValueObject<CommentBlogCountDislike> {
    private readonly countDislike: number;
    
    
    private constructor(countDislike: number) {
        super();
        this.countDislike = Object.freeze(countDislike); //*Esto funciona para que no pueda ser modificado
    }

    get CountDislike(): number {
        return this.countDislike;
    }
    
    equals(obj: CommentBlogCountDislike): boolean {
        return this.countDislike === obj.countDislike;
    }

    public static create(countDislike: number): CommentBlogCountDislike {
        return new CommentBlogCountDislike(countDislike);
    }
}