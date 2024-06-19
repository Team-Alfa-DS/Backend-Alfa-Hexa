import { DomainException } from "src/common/domain/domain-exception";

export class InvalidCommentLessonBodyException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}