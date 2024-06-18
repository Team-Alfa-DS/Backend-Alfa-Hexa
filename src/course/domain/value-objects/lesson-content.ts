import { ValueObject } from "src/common/domain/value-object";

export class LessonContent extends ValueObject<LessonContent> {
  private readonly content: string;
  
  constructor(value: string) {
    super();
    
    if (!value) {/* throw DomainException */};
    
    this.content = value;
  }

  equals(obj: LessonContent): boolean {
    return this.content === obj.content;
  }
}