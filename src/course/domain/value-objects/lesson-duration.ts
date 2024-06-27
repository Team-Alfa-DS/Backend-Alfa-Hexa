import { ValueObject } from "src/common/domain/value-object";
import { NullLessonSecondsException } from "../exceptions/nullLessonSeconds";
import { NegativeLessonSecondsException } from "../exceptions/negativeLessonSeconds";

export class LessonDuration extends ValueObject<LessonDuration> {
  readonly value: number;

  constructor(value: number) {
    super();

    if (!value) { throw new NullLessonSecondsException('No se proporcionó duración para la lección') /* throw DomainException NullLessonDurationException */}

    if (value <= 0) { throw new NegativeLessonSecondsException(`La lección no puede tener duración negativa: ${value}`) /* throw DomainException NegativeLessonDurationException */}

    this.value = value;
  }

  equals(obj: LessonDuration): boolean {
    return this.value === obj.value;
  }
  
}