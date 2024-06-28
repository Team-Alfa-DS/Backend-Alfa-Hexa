import { DomainException } from "src/common/domain/domain-exception";

export class InvalidLessonCommentBodyException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}