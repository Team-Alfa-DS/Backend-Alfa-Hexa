import { Lesson } from "../entities/Lesson";
import { Uuid } from "../value-objects/Uuid";
import { CourseDescription } from "../value-objects/course-description";
import { CourseDurationMinutes } from "../value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "../value-objects/course-durationWeeks";
import { CourseLevel } from "../value-objects/course-level";
import { CourseTitle } from "../value-objects/course-title";
import { Url } from "../value-objects/url";

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
    private tags: string[], //entity?
    private category: string, //entity?
    private trainer: {id: string, name: string} //entity?
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

  get Tags(): string[] {
    return this.tags;
  } 

  get Category(): string {
    return this.category;
  }

  get Trainer(): {id: string, name: string} {
    const id = this.trainer.id;
    const name = this.trainer.name;
    return {id, name};
  }
}