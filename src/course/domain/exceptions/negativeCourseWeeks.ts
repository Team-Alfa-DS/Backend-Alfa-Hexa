import { DomainException } from "src/common/domain/domain-exception";

export class NegativeCourseWeeksException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}