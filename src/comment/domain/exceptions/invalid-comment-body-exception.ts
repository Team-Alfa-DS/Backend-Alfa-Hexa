import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentBodyException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}