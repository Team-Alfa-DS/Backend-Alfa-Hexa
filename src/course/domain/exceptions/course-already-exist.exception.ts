import { DomainException } from "src/common/domain/domain-exception";

export class CourseAlreadyExistException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}