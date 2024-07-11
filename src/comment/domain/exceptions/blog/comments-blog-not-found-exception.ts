import { DomainException } from "../../../../../src/common/domain/domain-exception";

export class CommentsBlogNotFoundException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}