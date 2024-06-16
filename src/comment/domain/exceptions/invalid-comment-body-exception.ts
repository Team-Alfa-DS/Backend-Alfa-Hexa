import { DomainException } from "src/common/domain/domain-exception";

export class InvalidBodyException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}