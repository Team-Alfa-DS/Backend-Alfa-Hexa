import { DomainException } from "src/common/domain/domain-exception";

export class BadFormatCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}