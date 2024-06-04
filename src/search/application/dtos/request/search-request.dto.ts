export class SearchRequestDto {
    term?: string;
    tag?: string[];
    page: number;
    perpage: number;
}