import { DomainException } from "src/common/domain/domain-exception";

export class InvalidProgressException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}