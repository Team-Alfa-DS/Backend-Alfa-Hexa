import { ValueObject } from "src/common/domain/value-object";
import { NullLessonSecondsException } from "../exceptions/nullLessonSeconds";
import { NegativeLessonSecondsException } from "../exceptions/negativeLessonSeconds";

export class LessonDuration extends ValueObject<LessonDuration> {
  private readonly seconds: number;

  private constructor(value: number) {
    super();

    if (!value) { throw new NullLessonSecondsException('No se proporcionó duración para la lección') /* throw DomainException NullLessonDurationException */}

    if (value <= 0) { throw new NegativeLessonSecondsException(`La lección no puede tener duración negativa: ${value}`) /* throw DomainException NegativeLessonDurationException */}

    this.seconds = value;
  }

  equals(obj: LessonDuration): boolean {
    return this.seconds === obj.seconds;
  }
  
}