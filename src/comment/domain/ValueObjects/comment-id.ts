import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentIdException } from "../exceptions/empty-id-exception";

export class CommentId extends ValueObject<CommentId> {
    private readonly id: string;
    
    
    private constructor(id: string) {
        super();
        
        let valid: boolean = true;
        
        if (!id ) valid = false;
        if (!valid) throw new InvalidCommentIdException("El id no existe");
        
        this.id = Object.freeze(id); //*Esto funciona para que no pueda ser modificado el id
    }

    get commentId(): string {
        return this.id;
    }
    
    equals(obj: CommentId): boolean {
        return this.id === obj.id;
    }

    public static create(id: string): CommentId {
        return new CommentId(id);
    }
}