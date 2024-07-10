import { DomainException } from "src/common/domain/domain-exception";

export class EmptyCategoryIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}