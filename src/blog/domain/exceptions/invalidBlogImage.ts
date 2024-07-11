import { DomainException } from "../../../../src/common/domain/domain-exception";


export class InvalidBlogImage extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}