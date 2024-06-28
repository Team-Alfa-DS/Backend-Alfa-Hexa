import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCourseException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}