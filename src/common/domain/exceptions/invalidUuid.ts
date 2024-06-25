import { DomainException } from "src/common/domain/domain-exception";

export class InvalidUuidException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}