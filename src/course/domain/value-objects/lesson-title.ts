import { ValueObject } from "src/common/domain/value-object";
import { NullLessonTitleException } from "../exceptions/nullLessonTitle";

export class LessonTitle extends ValueObject<LessonTitle> {
  readonly value: string;

  constructor(value: string) {
    super();

    if (!value) { throw new NullLessonTitleException('No se proporcionó un título para la lección') /* throw DomainException */}
  
    this.value = value;
  }

  equals(obj: LessonTitle): boolean {
    return this.value === obj.value
  }

}