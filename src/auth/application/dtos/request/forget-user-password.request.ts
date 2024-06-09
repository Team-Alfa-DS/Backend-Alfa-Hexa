import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class ForgetUserPasswordRequest implements ServiceRequestDto {
    constructor(
        readonly email: string,
        readonly code: number
    ) {}

    dataToString(): string {
        return `ForgetUserPassword: { email: ${this.email} | code: ${this.code} }`
    }
}