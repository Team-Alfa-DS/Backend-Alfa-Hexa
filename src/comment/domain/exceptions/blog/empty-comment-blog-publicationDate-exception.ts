import { DomainException } from "../../../../../src/common/domain/domain-exception";

export class EmptyBlogCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}