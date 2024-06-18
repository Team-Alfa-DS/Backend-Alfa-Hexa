import { ValueObject } from "src/common/domain/value-object";
import { NullCourseDescriptionException } from "../exceptions/nullCourseDescription";

export class CourseDescription extends ValueObject<CourseDescription> {
  private readonly description: string;

  constructor(value: string) {
    super();

    if (!value) { throw new NullCourseDescriptionException('No se proporcionó una descripción para el curso') /* throw DomainException NullCourseDescription*/}

    this.description = value;
  }

  equals(obj: CourseDescription): boolean {
    return this.description === obj.description;
  }
}