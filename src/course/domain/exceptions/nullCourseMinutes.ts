import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseMinutesException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}