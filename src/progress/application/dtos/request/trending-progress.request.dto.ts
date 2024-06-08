import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class TrendingProgressRequest implements ServiceRequestDto {
    
    constructor(readonly userId: string) {}

    dataToString(): string {
        return `TrendingProgressReq: { userId: ${this.userId} }`
    }
}