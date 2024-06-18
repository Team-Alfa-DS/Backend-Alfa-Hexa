import { ValueObject } from "src/common/domain/value-object"

export class CourseLevel extends ValueObject<CourseLevel> {
  private readonly level: string;

  constructor(value: string) {
    super()

    if(!value) {/* throw DomainException NullLevelException */}

    this.level = value
  }

  equals(obj: CourseLevel): boolean {
      return this.level === obj.level;
  }
}