import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseTrainerException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}