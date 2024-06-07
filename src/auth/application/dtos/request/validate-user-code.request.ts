import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class ValidateUserCodeRequest implements ServiceRequestDto {
    
    constructor(
        readonly email: string,
        readonly code: number,
        readonly codeSaved: number
    ){}

    dataToString(): string {
        return `ValidateUserCodeReq: { email: ${this.email} | code: ${this.code} | codeSaved: ${this.codeSaved} }`
    }
}