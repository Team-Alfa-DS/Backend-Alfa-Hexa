import { ValueObject } from "src/common/domain/value-object";
import { NullCourseDescriptionException } from "../exceptions/nullCourseDescription";

export class CourseDescription extends ValueObject<CourseDescription> {
  readonly value: string;

  constructor(value: string) {
    super();

    if (!value) { throw new NullCourseDescriptionException('No se proporcionó una descripción para el curso') /* throw DomainException NullCourseDescription*/}

    this.value = value;
  }

  equals(obj: CourseDescription): boolean {
    return this.value === obj.value;
  }
}