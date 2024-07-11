import { DomainException } from "../../../../src/common/domain/domain-exception";


export class InvalidBlogId extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}