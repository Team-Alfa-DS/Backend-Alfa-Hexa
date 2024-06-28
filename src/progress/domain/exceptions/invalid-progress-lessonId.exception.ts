import { DomainException } from "src/common/domain/domain-exception";

export class InvalidProgressLessonIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}