import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class RegisterUserResponse implements ServiceResponseDto {

    constructor(readonly id: string) {}
    dataToString(): string {
        return `RegisterUserRes: { id: ${this.id} }`
    }
    
}