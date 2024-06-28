import { DomainException } from "src/common/domain/domain-exception";

export class InvalidProgressLastTimeException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}