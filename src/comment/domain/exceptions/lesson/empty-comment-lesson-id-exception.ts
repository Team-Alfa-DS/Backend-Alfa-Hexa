import { DomainException } from "src/common/domain/domain-exception";

export class EmptyLessonCommentIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}