import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentBlogBodyException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}