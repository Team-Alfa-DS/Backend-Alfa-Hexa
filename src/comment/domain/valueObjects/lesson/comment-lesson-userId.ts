import { ValueObject } from "src/common/domain/value-object";

export class CommentLessonUserId extends ValueObject<CommentLessonUserId> {
    private readonly userId: string;
    
    private constructor(userId: string) {
        super();
        this.userId = Object.freeze(userId); //*Esto funciona para que no pueda ser modificado
    }

    get UserId(): string {
        return this.userId;
    }
    
    equals(obj: CommentLessonUserId): boolean {
        return this.userId === obj.userId;
    }

    public static create(userId: string): CommentLessonUserId {
        return new CommentLessonUserId(userId);
    }
}