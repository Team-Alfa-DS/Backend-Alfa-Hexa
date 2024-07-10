import { DomainException } from "src/common/domain/domain-exception";

export class CourseDateOutOfRangeException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}