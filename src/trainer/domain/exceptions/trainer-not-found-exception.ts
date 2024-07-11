import { DomainException } from "../../../../src/common/domain/domain-exception";

export class TrainerNotFoundException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}