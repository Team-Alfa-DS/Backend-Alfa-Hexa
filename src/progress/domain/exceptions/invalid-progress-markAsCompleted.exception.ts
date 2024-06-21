import { DomainException } from "src/common/domain/domain-exception";

export class InvalidProgressMaekAsCompletedException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}