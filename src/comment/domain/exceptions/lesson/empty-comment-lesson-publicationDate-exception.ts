import { DomainException } from "src/common/domain/domain-exception";

export class EmptyLessonCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}