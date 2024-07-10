import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class CreateCategoryResponse implements ServiceResponseDto {

    constructor() {}

    dataToString(): string {
        return `CreateCategoryRes: { }`
    }
}