import { DomainException } from "src/common/domain/domain-exception";

export class ProgressNotFoundException extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}