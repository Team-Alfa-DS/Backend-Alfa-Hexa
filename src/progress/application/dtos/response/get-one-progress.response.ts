import { ServiceResponseDto } from "src/common/application/interfaces/IService";
import { LessonProgress } from "src/progress/domain/response/calc-percent-progress.response";

export class GetOneProgressResponse implements ServiceResponseDto {

    constructor(
        readonly percent: number,
        readonly lessons: LessonProgress[],
    ) {}

    dataToString(): string {
        return `GetOneProgressRes: { percent: ${this.percent} }` //falta agregar el array de lessons
    }
}