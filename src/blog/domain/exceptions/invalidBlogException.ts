import { DomainException } from "../../../../src/common/domain/domain-exception";


export class InvalidBlogException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}   