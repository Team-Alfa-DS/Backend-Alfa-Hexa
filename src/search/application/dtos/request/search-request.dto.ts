import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class SearchRequestDto implements ServiceRequestDto {
    
    constructor(
        readonly page: number,
        readonly perpage: number,
        readonly term?: string,
        readonly tags?: string[]
    ) {}

    

    dataToString(): string {
        return `SearchRequest: { term: ${this.term} | tag: ${JSON.stringify(this.tags)} | page: ${this.page} | perpage: ${this.perpage}}`
    }
}