import { ValueObject } from "src/common/domain/value-object"
import { NullCourseLevelException } from "../exceptions/nullCourseLevel";

export class CourseLevel extends ValueObject<CourseLevel> {
  private readonly level: string;

  constructor(value: string) {
    super()

    if(!value) { throw new NullCourseLevelException('No se proporcionó un nivel para el curso') /* throw DomainException NullLevelException */}

    this.level = value
  }

  equals(obj: CourseLevel): boolean {
      return this.level === obj.level;
  }
}