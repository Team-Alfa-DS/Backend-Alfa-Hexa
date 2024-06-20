import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentBlogIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}