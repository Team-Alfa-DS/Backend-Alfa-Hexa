import { DomainException } from "src/common/domain/domain-exception";

export class InvalidTrainerException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}