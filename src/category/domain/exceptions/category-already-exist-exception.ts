import { DomainException } from "src/common/domain/domain-exception";

export class CategoryAlreadyExistException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}