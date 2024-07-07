import { Result } from "src/common/domain/result-handler/result";
import { CommentLesson } from "../domain/comment-lesson";
import { LessonCommentLessonId } from "../domain/valueObjects/lesson/comment-lesson-lessonId";

export interface IOdmLessonCommentRepository {
    findAllCommentsByLessonId(id: LessonCommentLessonId): Promise<Result<CommentLesson[]>>;
}