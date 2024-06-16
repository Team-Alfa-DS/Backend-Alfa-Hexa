import { ValueObject } from "src/common/domain/value-object";

export class CommentUserLiked extends ValueObject<CommentUserLiked> {
    private readonly userLiked: boolean;
    
    
    private constructor(userLiked: boolean) {
        super();
        this.userLiked = Object.freeze(userLiked); //*Esto funciona para que no pueda ser modificado
    }

    get UserLiked(): boolean {
        return this.userLiked;
    }
    
    equals(obj: CommentUserLiked): boolean {
        return this.userLiked === obj.userLiked;
    }

    public static create(userLiked: boolean): CommentUserLiked {
        return new CommentUserLiked(userLiked);
    }
}