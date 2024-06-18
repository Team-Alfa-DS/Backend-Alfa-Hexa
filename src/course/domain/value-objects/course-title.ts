import { ValueObject } from "src/common/domain/value-object";
import { NullCourseTitleException } from "../exceptions/nullCourseTitle";

export class CourseTitle extends ValueObject<CourseTitle> {
  private readonly title: string;

  constructor(value: string) {
    super();

    if (!value) { throw new NullCourseTitleException('No se proporcionó un título para el curso') /* throw DomainException */}
  
    this.title = value;
  }

  equals(obj: CourseTitle): boolean {
    return this.title === obj.title
  }

}