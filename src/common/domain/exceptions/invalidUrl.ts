import { DomainException } from "src/common/domain/domain-exception";

export class InvalidUrlException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}