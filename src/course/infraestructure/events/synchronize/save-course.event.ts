import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { Course } from "src/course/domain/Course";
import { CourseRegistered } from "src/course/domain/events/course-registered.event";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";

export class SaveCourseEvent implements IEventSubscriber<CourseRegistered> {
  
  constructor(private odmCourseRepository: ICourseRepository) {}

  async on(event: CourseRegistered): Promise<void> {
    const course = Course.create(
      event.id,
      event.title,
      event.description,
      event.image,
      event.date,
      event.durationMinutes,
      event.durationWeeks,
      event.level,
      [],
      event.tags,
      event.category,
      event.trainer
    );

    await this.odmCourseRepository.saveCourse(course);
  }
}