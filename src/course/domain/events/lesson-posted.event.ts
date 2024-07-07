import { DomainEvent } from "src/common/domain/domain-event";
import { CourseId } from "../value-objects/course-id";
import { LessonTitle } from "../value-objects/lesson-title";
import { LessonContent } from "../value-objects/lesson-content";
import { LessonDuration } from "../value-objects/lesson-duration";
import { LessonVideo } from "../value-objects/lesson-video";
import { LessonId } from "../value-objects/lesson-id";

export class LessonPosted extends DomainEvent {
  
  constructor(
    public id: LessonId,
    public title: LessonTitle,
    public content: LessonContent,
    public seconds: LessonDuration,
    public video: LessonVideo,
    public courseId: CourseId
  ) {super()}
}