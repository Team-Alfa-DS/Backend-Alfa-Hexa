import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetAllCategoriesRequest implements ServiceRequestDto {

    constructor(
        readonly page?: number,
        readonly perpage?: number
    ) {}

    dataToString(): string {
        return `GetAllCategoriesReq: { page: ${this.page} | perpage: ${this.perpage} }`
    }
}