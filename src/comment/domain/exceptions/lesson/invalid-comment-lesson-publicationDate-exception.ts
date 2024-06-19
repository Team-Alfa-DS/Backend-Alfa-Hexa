import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentLessonPublicationDateException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}