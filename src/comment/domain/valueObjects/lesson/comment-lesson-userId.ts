import { ValueObject } from "src/common/domain/value-object";
import { EmptyLessonCommentUserIdException } from "../../exceptions/lesson/empty-comment-lesson-userid-exception";

export class CommentLessonUserId extends ValueObject<CommentLessonUserId> {
    private readonly userId: string;
    
    private constructor(userId: string) {
        super();

        if (!userId) throw new EmptyLessonCommentUserIdException("El id del usuario no puede estar vacío");

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