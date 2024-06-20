import { ValueObject } from "src/common/domain/value-object";

export class CommentCountDislike extends ValueObject<CommentCountDislike> {
    private readonly countDislike: number;
    
    
    private constructor(countDislike: number) {
        super();
        this.countDislike = Object.freeze(countDislike); //*Esto funciona para que no pueda ser modificado
    }

    get CountDislike(): number {
        return this.countDislike;
    }
    
    equals(obj: CommentCountDislike): boolean {
        return this.countDislike === obj.countDislike;
    }

    public static create(countDislike: number): CommentCountDislike {
        return new CommentCountDislike(countDislike);
    }
}