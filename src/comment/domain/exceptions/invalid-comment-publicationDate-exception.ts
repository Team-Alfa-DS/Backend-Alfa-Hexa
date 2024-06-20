import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}