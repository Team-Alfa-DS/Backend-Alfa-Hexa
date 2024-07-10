import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { Lesson } from "src/course/domain/entities/Lesson";
import { LessonPosted } from "src/course/domain/events/lesson-posted.event";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";

export class PostLessonEvent implements IEventSubscriber<LessonPosted> {
  
  constructor(private odmCourseRepository: ICourseQueryRepository) {}

  async on(event: LessonPosted): Promise<void> {
    const course = await this.odmCourseRepository.getCourseById(event.courseId);

    const lesson = new Lesson(
      event.id,
      event.title,
      event.content,
      event.seconds,
      event.video,
      []
    );

    await this.odmCourseRepository.saveLesson(lesson, course);
  }
}