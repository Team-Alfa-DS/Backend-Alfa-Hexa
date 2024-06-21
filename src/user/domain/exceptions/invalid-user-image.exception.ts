import { DomainException } from "src/common/domain/domain-exception";

export class InvalidUserImageException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}