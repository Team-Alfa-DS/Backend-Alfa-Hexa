import { DomainException } from "src/common/domain/domain-exception";

export class NegativeCourseMinutesException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}