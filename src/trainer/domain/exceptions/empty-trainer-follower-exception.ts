import { DomainException } from "src/common/domain/domain-exception";

export class EmptyTrainerFollowerException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}