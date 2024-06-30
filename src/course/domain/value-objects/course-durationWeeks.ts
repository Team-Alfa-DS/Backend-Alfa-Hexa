import { ValueObject } from "src/common/domain/value-object";
import { NullCourseWeekException } from "../exceptions/nullCourseWeeks";
import { NegativeCourseWeeksException } from "../exceptions/negativeCourseWeeks";

export class CourseDurationWeeks extends ValueObject<CourseDurationWeeks> {
  readonly value: number;

  constructor(value: number) {
    super();

    if (!value) { throw new NullCourseWeekException('No se proporcionó las semanas de duración para el curso') /* throw DomainException NullCourseWeeksException */}

    if (value <= 0) { throw new NegativeCourseWeeksException(`Las semanas de duración del curso no pueden ser negativas: ${value}`) /* throw DomainException NegativeCourseWeeksException */}

    this.value = value;
  }

  equals(obj: CourseDurationWeeks): boolean {
    return this.value === obj.value;
  }
}