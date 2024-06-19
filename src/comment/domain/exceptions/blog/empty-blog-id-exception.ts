import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentIdBlogException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}