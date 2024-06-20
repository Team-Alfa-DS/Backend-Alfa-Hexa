import { DomainException } from "src/common/domain/domain-exception";

export class InvalidUserPasswordException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}