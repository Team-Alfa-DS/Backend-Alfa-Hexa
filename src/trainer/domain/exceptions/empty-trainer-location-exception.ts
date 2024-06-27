import { DomainException } from "src/common/domain/domain-exception";

export class EmptyTrainerLocationException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}