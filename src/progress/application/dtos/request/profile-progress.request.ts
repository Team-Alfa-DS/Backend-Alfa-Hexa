import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class ProfileProgressRequest implements ServiceRequestDto {

    constructor(readonly userId: string) {}

    dataToString(): string {
        return `ProfileProgressReq: { userId: ${this.userId} }`
    }
}