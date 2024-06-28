import { DomainException } from "src/common/domain/domain-exception";

export class NullCourseCategoryException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}