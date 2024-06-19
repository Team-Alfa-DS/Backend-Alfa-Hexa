import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentIdLessonException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}