import { DomainException } from "src/common/domain/domain-exception";

export class InvalidProgressTimeException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}