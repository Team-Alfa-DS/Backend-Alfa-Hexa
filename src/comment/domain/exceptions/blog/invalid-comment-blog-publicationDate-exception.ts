import { DomainException } from "src/common/domain/domain-exception";

export class InvalidBlogCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}