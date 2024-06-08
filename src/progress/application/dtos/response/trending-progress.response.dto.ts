import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class TrendingProgressResponse implements ServiceResponseDto {
    
    constructor (
        readonly percent: number,
        readonly courseTitle: string,
        readonly courseId: string,
        readonly lastTime: Date
    ) {}

    dataToString(): string {
        return `TrendingProgressRes: { percent: ${this.percent} | courseTitle: ${this.courseTitle} | courseId: ${this.courseId} | lastTime: ${this.lastTime} }`
    }
}