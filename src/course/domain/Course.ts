import { Lesson } from "./entities/Lesson";
import { Uuid } from "../../common/domain/value-objects/Uuid";
import { CourseCategory } from "./value-objects/course-category";
import { CourseDescription } from "./value-objects/course-description";
import { CourseDurationMinutes } from "./value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "./value-objects/course-durationWeeks";
import { CourseLevel } from "./value-objects/course-level";
import { CourseTag } from "./value-objects/course-tag";
import { CourseTitle } from "./value-objects/course-title";
import { CourseTrainer } from "./value-objects/course-trainer";
import { Url } from "../../common/domain/value-objects/url";
import { AggregateRoot } from "src/common/domain/aggregate-root";
import { CourseId } from "./value-objects/course-id";
import { CourseImage } from "./value-objects/course-image";
import { CourseCreated } from "./events/course-created.event";
import { DomainEvent } from "src/common/domain/domain-event";
import { InvalidCourseException } from "./exceptions/invalidCourseException";
import { LessonId } from "./value-objects/lesson-id";

export class Course extends AggregateRoot<CourseId>{
  // private id: CourseId;
  private title: CourseTitle;
  private description: CourseDescription;
  private image: CourseImage;
  private date: Date;
  private durationMinutes: CourseDurationMinutes;
  private durationWeeks: CourseDurationWeeks;
  private level: CourseLevel;
  private lessons: Lesson[];
  private tags: CourseTag[];
  private category: CourseCategory; 
  private trainer: CourseTrainer; 

  constructor(
    id: CourseId,
    title: CourseTitle,
    description: CourseDescription,
    image: CourseImage,
    date: Date,
    durationMinutes: CourseDurationMinutes,
    durationWeeks: CourseDurationWeeks,
    level: CourseLevel,
    lessons: Lesson[],
    tags: CourseTag[],
    category: CourseCategory, 
    trainer: CourseTrainer 
  ) {
    const courseCreated = new CourseCreated(id, title, description, image, date, durationMinutes, durationWeeks, level, lessons, tags, category, trainer);
    super(id, courseCreated);
  }

  protected when(event: DomainEvent): void {
    if (event instanceof CourseCreated) {
      this.title = event.title;
      this.description = event.description;
      this.image = event.image;
      this.date = event.date;
      this.durationMinutes = event.durationMinutes;
      this.durationWeeks = event.durationWeeks;
      this.level = event.level;
      this.lessons = event.lessons;
      this.tags = event.tags;
      this.category = event.category;
      this.trainer = event.trainer;
    }
  }
  
  protected validateState(): void {
    if (!this.title || !this.description || !this.image || !this.date || !this.durationMinutes 
      || !this.durationWeeks || !this.level || !this.lessons || !this.tags || !this.category || !this.category || !this.trainer) {
        throw new InvalidCourseException('El curso no es válido');
      }
  }
  
  get Id(): CourseId {
    return new CourseId(super.Id.Value);
  }

  get Title(): CourseTitle {
    return new CourseTitle(this.title.value)
  }

  get Description(): CourseDescription {
    return new CourseDescription(this.description.value)
  }

  get Image(): CourseImage {
    return new CourseImage(this.image.Value);
  }

  get Date(): Date {
    return new Date(this.date)
  }

  get DurationMinutes(): CourseDurationMinutes {
    return new CourseDurationMinutes(this.durationMinutes.value)
  }

  get DurationWeeks(): CourseDurationWeeks {
    return new CourseDurationWeeks(this.durationWeeks.value)
  }

  get Level(): CourseLevel {
    return new CourseLevel(this.level.value)
  }

  get Lessons(): Lesson[] {
    return this.lessons;
  }

  getLesson(id: LessonId): Lesson {
    return this.lessons.find(lesson => lesson.id.equals(id));
  }

  get Tags(): CourseTag[] {
    const tags:CourseTag[] = [];
    for (let tag of this.tags) {
      tags.push(new CourseTag(tag.name));
    }

    return tags;
  }

  containsTag(searchedTag: string): boolean {
    for (let tag of this.tags) {
      if (tag.equals(new CourseTag(searchedTag))) {
        return true;
      }
    }
    return false;
  }

  get Category(): CourseCategory {
    return new CourseCategory(this.category.Value);
  }

  get Trainer(): CourseTrainer {
    return new CourseTrainer(this.trainer.value.trainerId);
  }
}