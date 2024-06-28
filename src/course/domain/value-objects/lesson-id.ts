import { ValueObject } from "src/common/domain/value-object";
import { Uuid } from "../../../common/domain/value-objects/Uuid";
import { NullLessonIdException } from "../exceptions/nullLessonId";


export class LessonId extends ValueObject<LessonId> {
  private value: Uuid;

  constructor(value: string) {
    super();

    if(!value) { throw new NullLessonIdException('No se pudo obtener un id de lección') /* throw DomainException NullCourseId */}

    this.value = new Uuid(value);
  }

  equals(obj: LessonId): boolean {
    return this.value.equals(obj.value);
  }

  get Value() {
    return this.value.value;
  }

}