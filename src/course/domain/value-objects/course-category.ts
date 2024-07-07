import { ValueObject } from "src/common/domain/value-object";
import { NullCourseCategoryException } from "../exceptions/nullCourseCategory";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";

export class CourseCategory extends ValueObject<CourseCategory> {
  readonly value: CategoryId; 
  
  constructor(id: string) {
    super();

    if (!id) { throw new NullCourseCategoryException('No se proporcionó un valor para la categoría')}

    this.value = CategoryId.create(id);
  }

  equals(obj: CourseCategory): boolean {
    return this.value.equals(obj.value);
  }
}