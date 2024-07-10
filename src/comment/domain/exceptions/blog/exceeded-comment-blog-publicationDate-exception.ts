import { DomainException } from "src/common/domain/domain-exception";

export class ExceededBlogCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}