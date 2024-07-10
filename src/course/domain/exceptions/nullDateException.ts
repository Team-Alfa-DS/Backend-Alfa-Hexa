import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseDateException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}