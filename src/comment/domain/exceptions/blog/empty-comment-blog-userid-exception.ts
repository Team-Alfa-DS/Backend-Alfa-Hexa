import { DomainException } from "src/common/domain/domain-exception";

export class EmptyBlogCommentUserIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}