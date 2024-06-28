import { ValueObject } from "src/common/domain/value-object";

export class CommentLessonUserLiked extends ValueObject<CommentLessonUserLiked> {
    private readonly userLiked: boolean;
    
    
    private constructor(userLiked: boolean) {
        super();
        this.userLiked = Object.freeze(userLiked); //*Esto funciona para que no pueda ser modificado
    }

    get UserLiked(): boolean {
        return this.userLiked;
    }
    
    equals(obj: CommentLessonUserLiked): boolean {
        return this.userLiked === obj.userLiked;
    }

    public static create(userLiked: boolean): CommentLessonUserLiked {
        return new CommentLessonUserLiked(userLiked);
    }
}