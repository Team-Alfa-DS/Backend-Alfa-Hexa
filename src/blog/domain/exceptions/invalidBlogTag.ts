import { DomainException } from "src/common/domain/domain-exception";


export class InvalidBlogTag extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}