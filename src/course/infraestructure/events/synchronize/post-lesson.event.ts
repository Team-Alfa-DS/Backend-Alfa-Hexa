import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { Lesson } from "src/course/domain/entities/Lesson";
import { LessonPosted } from "src/course/domain/events/lesson-posted.event";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";

export class PostLessonEvent implements IEventSubscriber<LessonPosted> {
  
  constructor(private odmCourseRepository: ICourseRepository) {}

  async on(event: LessonPosted): Promise<void> {
    const course = await this.odmCourseRepository.getCourseById(event.courseId);

    const lesson = new Lesson(
      event.id,
      event.title,
      event.content,
      event.seconds,
      event.video
    );

    await this.odmCourseRepository.saveLesson(lesson, course);
  }
}