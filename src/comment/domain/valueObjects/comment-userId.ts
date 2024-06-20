import { ValueObject } from "src/common/domain/value-object";

export class CommentUserId extends ValueObject<CommentUserId> {
    private readonly userId: string;
    
    private constructor(userId: string) {
        super();
        this.userId = Object.freeze(userId); //*Esto funciona para que no pueda ser modificado
    }

    get UserId(): string {
        return this.userId;
    }
    
    equals(obj: CommentUserId): boolean {
        return this.userId === obj.userId;
    }

    public static create(userId: string): CommentUserId {
        return new CommentUserId(userId);
    }
}