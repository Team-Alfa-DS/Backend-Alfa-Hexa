import { DomainException } from "../../../../src/common/domain/domain-exception";

export class EmptyCategoryNameException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}