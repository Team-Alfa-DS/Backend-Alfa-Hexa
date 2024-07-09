import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class CountUserFollowRequest implements ServiceRequestDto {

    constructor(
        readonly userId: string
    ) {}

    dataToString(): string {
        return `CountTrainerReq: { userId: ${this.userId} }`
    }
}