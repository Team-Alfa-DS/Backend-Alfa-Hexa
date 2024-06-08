import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class LoginUserRequest implements ServiceRequestDto {
    
    constructor(
        readonly email: string,
        readonly password: string
    ) {}
    
    dataToString(): string {
        return `LoginUserReq: { email: ${this.email} | password: ${this.password} }`
    }
}