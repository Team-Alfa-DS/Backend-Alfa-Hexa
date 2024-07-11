import { DomainException } from "../../../../src/common/domain/domain-exception";

export class InvalidTrainerFollowersException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}