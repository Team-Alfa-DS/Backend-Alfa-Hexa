import { DomainException } from "src/common/domain/domain-exception";

export class InvalidProgressIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}