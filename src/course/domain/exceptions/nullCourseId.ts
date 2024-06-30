import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseIdException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}