import { DomainException } from "src/common/domain/domain-exception";

export class InvalidUserTypeException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}