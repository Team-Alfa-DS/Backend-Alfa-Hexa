import { DomainException } from "src/common/domain/domain-exception";

export class InvalidBlogContent extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}