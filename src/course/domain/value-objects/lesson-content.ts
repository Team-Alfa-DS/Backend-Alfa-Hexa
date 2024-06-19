import { ValueObject } from "src/common/domain/value-object";
import { NullLessonContentException } from "../exceptions/nullLessonContent";

export class LessonContent extends ValueObject<LessonContent> {
  readonly value: string;
  
  constructor(value: string) {
    super();
    
    if (!value) { throw new NullLessonContentException('No se proporcionó un texto descriptivo para la lección') /* throw DomainException */};
    
    this.value = value;
  }

  equals(obj: LessonContent): boolean {
    return this.value === obj.value;
  }
}