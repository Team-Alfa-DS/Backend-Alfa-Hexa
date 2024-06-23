import { Lesson } from "../entities/Lesson";
import { Uuid } from "../../../common/domain/value-objects/Uuid";
import { CourseCategory } from "../value-objects/course-category";
import { CourseDescription } from "../value-objects/course-description";
import { CourseDurationMinutes } from "../value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "../value-objects/course-durationWeeks";
import { CourseLevel } from "../value-objects/course-level";
import { CourseTag } from "../value-objects/course-tag";
import { CourseTitle } from "../value-objects/course-title";
import { CourseTrainer } from "../value-objects/course-trainer";
import { Url } from "../../../common/domain/value-objects/url";

export class Course {
  
  constructor(
    private id: Uuid,
    private title: CourseTitle,
    private description: CourseDescription,
    private image: Url,
    private date: Date,
    private durationMinutes: CourseDurationMinutes,
    private durationWeeks: CourseDurationWeeks,
    private level: CourseLevel,
    private lessons: Lesson[],
    private tags: CourseTag[], //entity?
    private category: CourseCategory, //entity?
    private trainer: CourseTrainer //entity?
  ) {}  
  
  
  get Id(): Uuid {
    return new Uuid(this.id.value);
  }

  get Title(): CourseTitle {
    return new CourseTitle(this.title.value)
  }

  get Description(): CourseDescription {
    return new CourseDescription(this.description.value)
  }

  get Image(): Url {
    return new Url(this.image.url)
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

  getLesson(id: Uuid): Lesson {
    return this.lessons.find(lesson => lesson.id.equals(id));
  }

  get Tags(): CourseTag[] {
    const tags:CourseTag[] = [];
    for (let tag of this.tags) {
      tags.push(new CourseTag(tag.name));
    }

    return tags;
  }

  containsTag(tag: string): boolean {
    return this.tags.includes(new CourseTag(tag));
  }

  get Category(): CourseCategory {
    return new CourseCategory(this.category.name);
  }

  get Trainer(): CourseTrainer {
    return new CourseTrainer(this.trainer.id.value, this.trainer.name);
  }
}