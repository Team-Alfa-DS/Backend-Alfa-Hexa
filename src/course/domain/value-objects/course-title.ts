import { ValueObject } from "src/common/domain/value-object";
import { NullCourseTitleException } from "../exceptions/nullCourseTitle";

export class CourseTitle extends ValueObject<CourseTitle> {
  readonly value: string;

  constructor(value: string) {
    super();

    if (!value) { throw new NullCourseTitleException('No se proporcionó un título para el curso') /* throw DomainException */}
  
    this.value = value;
  }

  equals(obj: CourseTitle): boolean {
    return this.value === obj.value
  }

}