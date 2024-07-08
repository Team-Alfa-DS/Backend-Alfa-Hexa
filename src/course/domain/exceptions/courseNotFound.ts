import { DomainException } from "src/common/domain/domain-exception";

export class CourseNotFoundException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}