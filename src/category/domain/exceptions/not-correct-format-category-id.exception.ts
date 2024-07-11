import { DomainException } from "../../../../src/common/domain/domain-exception";

export class NotCorrectFormatCategoryIDException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}