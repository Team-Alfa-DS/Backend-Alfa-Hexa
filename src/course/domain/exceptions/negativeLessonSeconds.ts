import { DomainException } from "src/common/domain/domain-exception";

export class NegativeLessonSecondsException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}