import { ValueObject } from "src/common/domain/value-object"
import { NullCourseLevelException } from "../exceptions/nullCourseLevel";

export class CourseLevel extends ValueObject<CourseLevel> {
  readonly value: string;

  constructor(value: string) {
    super()

    if(!value) { throw new NullCourseLevelException('No se proporcionó un nivel para el curso') /* throw DomainException NullLevelException */}

    this.value = value
  }

  equals(obj: CourseLevel): boolean {
      return this.value === obj.value;
  }
}