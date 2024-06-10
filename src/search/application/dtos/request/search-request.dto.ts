import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class SearchRequestDto implements ServiceRequestDto {
    
    term?: string;
    tags?: string[];
    page: number;
    perpage: number;

    dataToString(): string {
        return `SearchRequest: { term: ${this.term} | tag: ${JSON.stringify(this.tags)} | page: ${this.page} | perpage: ${this.perpage}}`
    }
}