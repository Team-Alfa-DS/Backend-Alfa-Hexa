import { ValueObject } from "src/common/domain/value-object";

export class CourseTitle extends ValueObject<CourseTitle> {
  private readonly title: string;

  constructor(value: string) {
    super();

    if (!value) {/* throw DomainException */}
  
    this.title = value;
  }

  equals(obj: CourseTitle): boolean {
    return this.title === obj.title
  }

}