import { DomainException } from "src/common/domain/domain-exception";

export class InvalidProgressUserIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}