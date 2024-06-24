import { DomainException } from "src/common/domain/domain-exception";

export class EmptyBlogCommentBlogIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}