import { DomainException } from "src/common/domain/domain-exception";

export class EmptyCategoryIconException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}