import { ValueObject } from "src/common/domain/value-object";

export class CourseDurationWeeks extends ValueObject<CourseDurationWeeks> {
  private readonly weeks: number;

  private constructor(value: number) {
    super();

    if (!value) {/* throw DomainException NullCourseMinutesException */}

    if (value <= 0) {/* throw DomainException NegativeCourseMinutesException */}

    this.weeks = value;
  }

  equals(obj: CourseDurationWeeks): boolean {
    return this.weeks === obj.weeks;
  }
}