import { DomainException } from "src/common/domain/domain-exception";

export class EmptyTrainerIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}