import { ValueObject } from "src/common/domain/value-object";
import { NullLessonTitleException } from "../exceptions/nullLessonTitle";

export class LessonTitle extends ValueObject<LessonTitle> {
  private readonly title: string;

  constructor(value: string) {
    super();

    if (!value) { throw new NullLessonTitleException('No se proporcionó un título para la lección') /* throw DomainException */}
  
    this.title = value;
  }

  equals(obj: LessonTitle): boolean {
    return this.title === obj.title
  }

}