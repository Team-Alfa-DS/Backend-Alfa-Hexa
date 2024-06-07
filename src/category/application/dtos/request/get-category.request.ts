import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetCategoryRequest implements ServiceRequestDto {

    constructor (readonly categoryId: string) {}

    dataToString(): string {
        return `GetCategoryReq: { categoryId: ${this.categoryId} }`
    }
}