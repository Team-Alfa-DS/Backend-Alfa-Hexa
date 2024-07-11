import { DomainException } from "../../../../src/common/domain/domain-exception";

export class BlogNotFoundException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}