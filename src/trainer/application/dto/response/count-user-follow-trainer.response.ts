import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class CountUserFollowResponse implements ServiceResponseDto {

    constructor(
        readonly count: number
    ) {}

    dataToString(): string {
        return `CountTrainerRes: { count: ${this.count} }`
    }
}