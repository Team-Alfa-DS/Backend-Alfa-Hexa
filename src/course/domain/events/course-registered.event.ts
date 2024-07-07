import { DomainEvent } from "src/common/domain/domain-event";
import { CourseTitle } from "../value-objects/course-title";
import { CourseId } from "../value-objects/course-id";
import { CourseImage } from "../value-objects/course-image";
import { CourseDescription } from "../value-objects/course-description";
import { CourseDurationMinutes } from "../value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "../value-objects/course-durationWeeks";
import { CourseLevel } from "../value-objects/course-level";
import { CourseCategory } from "../value-objects/course-category";
import { CourseTag } from "../value-objects/course-tag";
import { CourseTrainer } from "../value-objects/course-trainer";

export class CourseRegistered extends DomainEvent {
  constructor(
    public id: CourseId,
    public title: CourseTitle,
    public description: CourseDescription,
    public image: CourseImage,
    public date: Date,
    public durationMinutes: CourseDurationMinutes,
    public durationWeeks: CourseDurationWeeks,
    public level: CourseLevel,
    public tags: CourseTag[],
    public category: CourseCategory,
    public trainer: CourseTrainer
  ) {super()}
}