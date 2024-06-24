import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Comment } from "src/comment/domain/Comment";
import { CommentLesson } from "../../comment-lesson";
import { LessonCommentLessonId } from "../../valueObjects/lesson/comment-lesson-lessonId";

export interface ILessonCommentRepository {
    findAllCommentsByLessonId(id: LessonCommentLessonId, runner: ITransactionHandler): Promise<Result<CommentLesson[]>>;
    saveComment(comment: CommentLesson, runner: ITransactionHandler): Promise<Result<CommentLesson>>;
}