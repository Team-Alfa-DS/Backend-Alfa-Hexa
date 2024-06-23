import { DomainException } from "src/common/domain/domain-exception";

export class InvalidProgressMarkAsCompletedException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}