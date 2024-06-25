import { ValueObject } from "src/common/domain/value-object";

export class CommentLessonCountDislike extends ValueObject<CommentLessonCountDislike> {
    private readonly countDislike: number;
    
    
    private constructor(countDislike: number) {
        super();
        this.countDislike = Object.freeze(countDislike); //*Esto funciona para que no pueda ser modificado
    }

    get CountDislike(): number {
        return this.countDislike;
    }
    
    equals(obj: CommentLessonCountDislike): boolean {
        return this.countDislike === obj.countDislike;
    }

    public static create(countDislike: number): CommentLessonCountDislike {
        return new CommentLessonCountDislike(countDislike);
    }
}