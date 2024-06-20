import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentLessonIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}