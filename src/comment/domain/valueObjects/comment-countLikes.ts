import { ValueObject } from "src/common/domain/value-object";

export class CommentCountLike extends ValueObject<CommentCountLike> {
    private readonly countLike: number;
    
    
    private constructor(countLike: number) {
        super();
        this.countLike = Object.freeze(countLike); //*Esto funciona para que no pueda ser modificado
    }

    get CountLike(): number {
        return this.countLike;
    }
    
    equals(obj: CommentCountLike): boolean {
        return this.countLike === obj.countLike;
    }

    public static create(countLike: number): CommentCountLike {
        return new CommentCountLike(countLike);
    }
}