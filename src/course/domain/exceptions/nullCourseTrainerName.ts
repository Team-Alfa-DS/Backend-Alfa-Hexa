import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseTrainerNameException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}