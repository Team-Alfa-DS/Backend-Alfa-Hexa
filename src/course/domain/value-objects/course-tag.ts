import { ValueObject } from "src/common/domain/value-object"
import { NullCourseTagException } from "../exceptions/nullCourseTag";

export class CourseTag extends ValueObject<CourseTag> {
  readonly name: string;
  
  constructor(name: string) {
    super();
    if (!name) { throw new NullCourseTagException('No se proporcionó un Tag')}

    this.name = name;
  }

  equals(obj: CourseTag): boolean {
    return obj.name === this.name;
  }
}