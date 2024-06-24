import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class SearchTagResponseDto implements ServiceResponseDto{
    constructor(
        readonly tagNames: string[]
    ) {}

    dataToString(): string {
        return `SearchResponse: { TagNames: ${JSON.stringify(this.tagNames)} }`;
    }
}