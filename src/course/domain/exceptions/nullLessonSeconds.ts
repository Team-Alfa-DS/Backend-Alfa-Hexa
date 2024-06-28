import { DomainException } from "src/common/domain/domain-exception";

export class NullLessonSecondsException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}