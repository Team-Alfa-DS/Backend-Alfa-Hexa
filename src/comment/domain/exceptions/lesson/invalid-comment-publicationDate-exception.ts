import { DomainException } from "src/common/domain/domain-exception";

export class InvalidLessonCommentPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}