import { DomainException } from "src/common/domain/domain-exception";

export class InvalidTrainerNameException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}