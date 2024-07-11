import { DomainException } from "../../../../src/common/domain/domain-exception";


export class InvalidBlogTitle extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}