import { DomainException } from "src/common/domain/domain-exception";

export class EmptyTrainerBlogIdException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}