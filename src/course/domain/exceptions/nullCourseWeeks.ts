import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseWeekException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}