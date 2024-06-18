import { ValueObject } from "src/common/domain/value-object";

export class LessonTitle extends ValueObject<LessonTitle> {
  private readonly title: string;

  constructor(value: string) {
    super();

    if (!value) {/* throw DomainException */}
  
    this.title = value;
  }

  equals(obj: LessonTitle): boolean {
    return this.title === obj.title
  }

}