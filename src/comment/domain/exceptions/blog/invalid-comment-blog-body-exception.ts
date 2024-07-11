import { DomainException } from "../../../../../src/common/domain/domain-exception";

export class InvalidBlogCommentBodyException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}