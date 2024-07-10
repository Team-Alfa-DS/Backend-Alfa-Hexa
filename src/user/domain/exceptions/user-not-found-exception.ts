import { DomainException } from "src/common/domain/domain-exception";

export class UserNotFoundException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}