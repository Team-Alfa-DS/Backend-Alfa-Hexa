import { ValueObject } from "src/common/domain/value-object";

export class CourseDurationMinutes extends ValueObject<CourseDurationMinutes> {
  private readonly minutes: number;

  private constructor(value: number) {
    super();

    if (!value) {/* throw DomainException NullCourseMinutesException */}

    if (value <= 0) {/* throw DomainException NegativeCourseMinutesException */}

    this.minutes = value;
  }

  equals(obj: CourseDurationMinutes): boolean {
    return this.minutes === obj.minutes;
  }
}