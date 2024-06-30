import { DomainException } from "src/common/domain/domain-exception";

export class NullUrlException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}