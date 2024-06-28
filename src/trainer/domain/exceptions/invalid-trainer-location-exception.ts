import { DomainException } from "src/common/domain/domain-exception";

export class InvalidTrainerLocationException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}