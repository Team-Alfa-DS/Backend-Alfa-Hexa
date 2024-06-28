import { ValueObject } from "src/common/domain/value-object";
import { Url } from "src/common/domain/value-objects/url";
import { NullLessonVideoException } from "../exceptions/nullLessonVideo";

export class LessonVideo extends ValueObject<LessonVideo> {
  private value: Url;

  constructor(value: string) {
    super();

    if(!value) { throw new NullLessonVideoException('No se proveyó una dirección para el video') /* throw DomainException NullCourseId */}

    this.value = new Url(value);
  }

  equals(obj: LessonVideo): boolean {
    return this.value.equals(obj.value);
  }

  get Value() {
    return this.value.url;
  }
}