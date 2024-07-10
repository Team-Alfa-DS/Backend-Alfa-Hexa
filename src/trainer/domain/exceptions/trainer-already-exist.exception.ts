import { DomainException } from "src/common/domain/domain-exception";

export class TrainerAlreadyExistException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}