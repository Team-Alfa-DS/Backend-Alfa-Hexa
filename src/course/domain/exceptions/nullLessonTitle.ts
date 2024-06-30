import { DomainException } from "src/common/domain/domain-exception";

export class NullLessonTitleException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}