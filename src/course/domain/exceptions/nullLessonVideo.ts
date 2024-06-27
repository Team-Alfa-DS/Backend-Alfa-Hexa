import { DomainException } from "src/common/domain/domain-exception";

export class NullLessonVideoException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}