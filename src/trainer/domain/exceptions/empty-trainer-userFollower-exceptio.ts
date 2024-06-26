import { DomainException } from "src/common/domain/domain-exception";

export class EmptyTrainerUserFollowerException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}