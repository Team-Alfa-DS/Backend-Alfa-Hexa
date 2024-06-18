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
    private readonly id: Uuid,
    private readonly title: CourseTitle,
    private readonly description: CourseDescription,
    private readonly image: Url,
    private readonly date: Date,
    private readonly durationMinutes: CourseDurationMinutes,
    private readonly durationWeeks: CourseDurationWeeks,
    private readonly level: CourseLevel,
    private readonly lessons: Lesson[],
    private readonly tags: string[],
    private readonly category: string,
    private readonly trainer: {id: string, name: string}
  ) {}  
              
}