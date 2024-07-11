import { DomainException } from "../../../../src/common/domain/domain-exception";

export class CategoryNotFoundException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}