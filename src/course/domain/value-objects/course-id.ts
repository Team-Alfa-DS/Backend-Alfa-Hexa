import { ValueObject } from "src/common/domain/value-object";
import { Uuid } from "./Uuid";
import { NullCourseIdException } from "../exceptions/nullCourseId";

export class CourseId extends ValueObject<CourseId> {
  readonly value: Uuid;

  constructor(value: string) {
    super();

    if(!value) { throw new NullCourseIdException('No se pudo obtener un Id de curso') /* throw DomainException NullCourseId */}

    this.value = new Uuid(value);
  }

  equals(obj: CourseId): boolean {
    return this.value.equals(obj.value);
  }

}