import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseImageException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}