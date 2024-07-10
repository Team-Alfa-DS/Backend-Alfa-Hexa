import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class CreateCategoryRequest implements ServiceRequestDto {

    constructor(
        readonly icon: Express.Multer.File,
        readonly name: string
    ) {}

    dataToString(): string {
        return `CreateCategoryReq: { name: ${this.name} }`
    }
}