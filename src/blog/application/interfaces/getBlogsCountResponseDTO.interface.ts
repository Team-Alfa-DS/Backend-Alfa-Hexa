import { ServiceResponseDto } from "src/common/application/interfaces/IService";


export class GetBlogsCountResponseDTO implements ServiceResponseDto{
    dataToString(): string {
        return `count: ${this.count}`;
    }
    constructor(public count: number) {}

}