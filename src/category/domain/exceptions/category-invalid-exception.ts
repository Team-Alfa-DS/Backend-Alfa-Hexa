import { DomainException } from "../../../../src/common/domain/domain-exception";

export class CategoryInvalidException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}