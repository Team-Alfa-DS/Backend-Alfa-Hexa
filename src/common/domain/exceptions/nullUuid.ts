import { DomainException } from "src/common/domain/domain-exception";

export class NullUuidException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}