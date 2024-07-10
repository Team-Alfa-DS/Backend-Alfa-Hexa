import { DomainException } from "src/common/domain/domain-exception";

export class CommentsLessonNotFoundException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}