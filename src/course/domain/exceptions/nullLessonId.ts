import { DomainException } from "src/common/domain/domain-exception";

export class NullLessonIdException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}