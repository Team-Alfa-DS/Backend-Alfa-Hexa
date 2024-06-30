import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseLevelException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}