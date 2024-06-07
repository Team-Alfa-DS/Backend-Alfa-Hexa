import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class ForgetUserPasswordResponse implements ServiceResponseDto {

    constructor(readonly date: Date) {}

    dataToString(): string {
        return `ForgetUserPasswordRes: { date: ${this.date} }`
    }
    
}