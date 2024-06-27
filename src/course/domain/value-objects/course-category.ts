import { ValueObject } from "src/common/domain/value-object";
import { NullCourseCategoryException } from "../exceptions/nullCourseCategory";
import { Uuid } from "src/common/domain/value-objects/Uuid";

export class CourseCategory extends ValueObject<CourseCategory> {
  private value: Uuid; 
  
  constructor(id: string) {
    super();

    if (!id) { throw new NullCourseCategoryException('No se proporcionó un valor para la categoría')}

    this.value = new Uuid(id);
  }

  equals(obj: CourseCategory): boolean {
    return this.value.equals(obj.value);
  }

  get Value() {
    return this.value.value;
  }
}