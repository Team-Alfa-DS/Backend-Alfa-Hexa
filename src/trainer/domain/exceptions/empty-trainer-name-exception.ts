import { DomainException } from "../../../../src/common/domain/domain-exception";

export class EmptyTrainerNameException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}