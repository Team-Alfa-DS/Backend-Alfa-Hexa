import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseTagException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}