import { DomainException } from "src/common/domain/domain-exception";

export class ExceededLessonCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}