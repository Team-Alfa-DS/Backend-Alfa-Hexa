import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentBlogPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}