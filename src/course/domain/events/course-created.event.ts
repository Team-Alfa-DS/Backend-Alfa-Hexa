import { DomainEvent } from "src/common/domain/domain-event";
import { CourseId } from "../value-objects/course-id";
import { CourseTitle } from "../value-objects/course-title";
import { CourseDescription } from "../value-objects/course-description";
import { CourseDurationMinutes } from "../value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "../value-objects/course-durationWeeks";
import { CourseLevel } from "../value-objects/course-level";
import { Lesson } from "../entities/Lesson";
import { CourseTag } from "../value-objects/course-tag";
import { CourseCategory } from "../value-objects/course-category";
import { CourseTrainer } from "../value-objects/course-trainer";
import { CourseImage } from "../value-objects/course-image";

export class CourseCreated extends DomainEvent {
  constructor(
    public id: CourseId,
    public title: CourseTitle,
    public description: CourseDescription,
    public image: CourseImage,
    public date: Date,
    public durationMinutes: CourseDurationMinutes,
    public durationWeeks: CourseDurationWeeks,
    public level: CourseLevel,
    public lessons: Lesson[],
    public tags: CourseTag[], 
    public category: CourseCategory, 
    public trainer: CourseTrainer 
  ) {super()}

  // static create(
  //   id: CourseId,
  //   title: CourseTitle,
  //   description: CourseDescription,
  //   image: CourseId,
  //   date: Date,
  //   durationMinutes: CourseDurationMinutes,
  //   durationWeeks: CourseDurationWeeks,
  //   level: CourseLevel,
  //   lessons: Lesson[],
  //   tags: CourseTag[], 
  //   category: CourseCategory, 
  //   trainer: CourseTrainer 
  // ) {
  //   return new CourseCreated(id, title, description, image, date, durationMinutes, durationWeeks, level, lessons, tags, category, trainer);
  // }
}