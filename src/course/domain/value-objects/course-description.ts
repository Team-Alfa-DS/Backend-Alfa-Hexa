import { ValueObject } from "src/common/domain/value-object";

export class CourseDescription extends ValueObject<CourseDescription> {
  private readonly description: string;

  constructor(value: string) {
    super();

    if (!value) {/* throw DomainException NullCourseDescription*/}

    this.description = value;
  }

  equals(obj: CourseDescription): boolean {
    return this.description === obj.description;
  }
}