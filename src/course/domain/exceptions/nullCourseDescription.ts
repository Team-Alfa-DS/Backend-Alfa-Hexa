import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseDescriptionException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}