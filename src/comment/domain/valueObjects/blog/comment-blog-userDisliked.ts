import { ValueObject } from "src/common/domain/value-object";

export class CommentBlogUserDisliked extends ValueObject<CommentBlogUserDisliked> {
    private readonly userDisliked: boolean;
    
    
    private constructor(userDisliked: boolean) {
        super();
        this.userDisliked = Object.freeze(userDisliked); //*Esto funciona para que no pueda ser modificado
    }

    get UserDisliked(): boolean {
        return this.userDisliked;
    }
    
    equals(obj: CommentBlogUserDisliked): boolean {
        return this.userDisliked === obj.userDisliked;
    }

    public static create(userDisliked: boolean): CommentBlogUserDisliked {
        return new CommentBlogUserDisliked(userDisliked);
    }
}