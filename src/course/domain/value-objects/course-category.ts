import { ValueObject } from "src/common/domain/value-object";
import { NullCourseCategoryException } from "../exceptions/nullCourseCategory";

export class CourseCategory extends ValueObject<CourseCategory> {
  readonly name: string; 
  
  constructor(name: string) {
    super();

    if (!name) { throw new NullCourseCategoryException('No se proporcionó una categoría')}

    this.name = name;
  }

  equals(obj: CourseCategory): boolean {
      return this.name === obj.name;
  }
}