
import { LessonCommentId } from "src/comment/domain/valueObjects/lesson/comment-lesson-id";
import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { CommentLesson } from "src/course/domain/entities/comment-lesson";
import { Lesson } from "src/course/domain/entities/Lesson";
import { CommentLessonPosted } from "src/course/domain/events/comment-lesson-posted.event";
import { LessonPosted } from "src/course/domain/events/lesson-posted.event";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";

export class CreateCommentLessonEvent implements IEventSubscriber<CommentLessonPosted> {

    constructor(private odmCourseRepository: ICourseQueryRepository) {}

    async on(event: CommentLessonPosted): Promise<void> {
        const comment = CommentLesson.create(
            event.id, 
            event.publicationDate, 
            event.body, 
            event.userId,
            event.LessonId,
            // event.userLiked,
            // event.userDisliked
        );
        this.odmCourseRepository.saveComment(comment);
    }
}