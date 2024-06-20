import { ValueObject } from "src/common/domain/value-object";

export class CommentUserDisliked extends ValueObject<CommentUserDisliked> {
    private readonly userDisliked: boolean;
    
    
    private constructor(userDisliked: boolean) {
        super();
        this.userDisliked = Object.freeze(userDisliked); //*Esto funciona para que no pueda ser modificado
    }

    get UserDisliked(): boolean {
        return this.userDisliked;
    }
    
    equals(obj: CommentUserDisliked): boolean {
        return this.userDisliked === obj.userDisliked;
    }

    public static create(userDisliked: boolean): CommentUserDisliked {
        return new CommentUserDisliked(userDisliked);
    }
}