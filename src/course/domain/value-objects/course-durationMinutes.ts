import { ValueObject } from "src/common/domain/value-object";
import { NullCourseMinutesException } from "../exceptions/nullCourseMinutes";
import { NegativeCourseWeeksException } from "../exceptions/negativeCourseWeeks";

export class CourseDurationMinutes extends ValueObject<CourseDurationMinutes> {
  readonly value: number;

  constructor(value: number) {
    super();

    if ((value == null) || (value == undefined)) { throw new NullCourseMinutesException('No se proporcionó los minutos de duración para el curso') /* throw DomainException NullCourseMinutesException */}

    if (value < 0) { throw new NegativeCourseWeeksException(`Los minutos de duración no pueden ser negativos: ${value}`) /* throw DomainException NegativeCourseMinutesException */}

    this.value = value;
  }

  equals(obj: CourseDurationMinutes): boolean {
    return this.value === obj.value;
  }
}