import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class ChangeUserPasswordRequest implements ServiceRequestDto{
    
    constructor(
        readonly email: string,
        readonly code: number,
        readonly password: string
    ) {}

    dataToString(): string {
        return `ChangeUserPasswordReq: { email: ${this.email} | code: ${this.code} | password: ${this.password} }`;
    }
}