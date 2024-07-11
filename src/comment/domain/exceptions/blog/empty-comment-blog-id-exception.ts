import { DomainException } from "../../../../../src/common/domain/domain-exception";

export class EmptyBlogCommentIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}