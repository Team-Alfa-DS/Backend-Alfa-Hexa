import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class ProfileProgressResponse implements ServiceResponseDto {

    constructor(
        readonly percent: number,
        readonly time: number
    ) {}

    dataToString(): string {
        return `ProfileProgressRes: { percent: ${this.percent} | time: ${this.time} }`
    }
}