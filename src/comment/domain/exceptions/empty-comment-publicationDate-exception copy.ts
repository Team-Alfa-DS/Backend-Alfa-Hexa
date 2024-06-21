import { DomainException } from "src/common/domain/domain-exception";

export class EmptyCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}