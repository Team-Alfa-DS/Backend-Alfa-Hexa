import { ValueObject } from "src/common/domain/value-object";

export class CommentBlogUserLiked extends ValueObject<CommentBlogUserLiked> {
    private readonly userLiked: boolean;
    
    
    private constructor(userLiked: boolean) {
        super();
        this.userLiked = Object.freeze(userLiked); //*Esto funciona para que no pueda ser modificado
    }

    get UserLiked(): boolean {
        return this.userLiked;
    }
    
    equals(obj: CommentBlogUserLiked): boolean {
        return this.userLiked === obj.userLiked;
    }

    public static create(userLiked: boolean): CommentBlogUserLiked {
        return new CommentBlogUserLiked(userLiked);
    }
}