import { ValueObject } from "src/common/domain/value-object";

export class LessonDuration extends ValueObject<LessonDuration> {
  private readonly seconds: number;

  private constructor(value: number) {
    super();

    if (!value) {/* throw DomainException NullLessonDurationException */}

    if (value <= 0) {/* throw DomainException NegativeLessonDurationException */}

    this.seconds = value;
  }

  equals(obj: LessonDuration): boolean {
    return this.seconds === obj.seconds;
  }
  
}