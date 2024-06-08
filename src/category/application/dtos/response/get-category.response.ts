import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class GetCategoryResponse implements ServiceResponseDto {

    constructor (
        readonly icon: string,
        readonly id: string,
        readonly name: string
    ) {}

    dataToString(): string {
        return `GetCategoryRes: { id: ${this.id} | name: ${this.name} }`
    }
}