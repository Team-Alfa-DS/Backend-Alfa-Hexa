import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseTitleException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}