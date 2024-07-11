import { DomainException } from "../../../../src/common/domain/domain-exception";

export class EmptyuserIdExceptionTrainer extends DomainException {
    constructor(msg: string) {
        super(msg);
    }
}