import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}