import { ValueObject } from "src/common/domain/value-object";

export class CommentLessonCountLike extends ValueObject<CommentLessonCountLike> {
    private readonly countLike: number;
    
    
    private constructor(countLike: number) {
        super();
        this.countLike = Object.freeze(countLike); //*Esto funciona para que no pueda ser modificado
    }

    get CountLike(): number {
        return this.countLike;
    }
    
    equals(obj: CommentLessonCountLike): boolean {
        return this.countLike === obj.countLike;
    }

    public static create(countLike: number): CommentLessonCountLike {
        return new CommentLessonCountLike(countLike);
    }
}