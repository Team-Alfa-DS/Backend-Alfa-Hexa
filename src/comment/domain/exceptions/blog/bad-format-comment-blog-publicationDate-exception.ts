import { DomainException } from "src/common/domain/domain-exception";

export class BadFormaBlogCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}