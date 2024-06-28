import { DomainException } from "src/common/domain/domain-exception";

export class EmptyLessonCommentUserIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}