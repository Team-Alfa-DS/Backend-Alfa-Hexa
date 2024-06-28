import { ValueObject } from "src/common/domain/value-object";
import { Url } from "src/common/domain/value-objects/url";
import { NullCourseImageException } from "../exceptions/nullCourseImage";

export class CourseImage extends ValueObject<CourseImage> {
  private value: Url;

  constructor(value: string) {
    super();

    if(!value) { throw new NullCourseImageException('No se proveyó una dirección para la imagen') /* throw DomainException NullCourseId */}

    this.value = new Url(value);
  }

  equals(obj: CourseImage): boolean {
    return this.value.equals(obj.value);
  }

  get Value() {
    return this.value.url;
  }
}