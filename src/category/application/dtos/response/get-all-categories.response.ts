import { ServiceResponseDto } from "src/common/application/interfaces/IService";

type CategoryRes = {
    icon: string,
    id: string,
    name: string
}

export class GetAllCategoriesResponse implements ServiceResponseDto {

    constructor(
        readonly categories: CategoryRes[]
    ) {}

    dataToString(): string {
        const message = JSON.stringify(this.categories);
        return `GetAllCategoriesRes: { categories: ${message} }`  //aplicar algun metodo para volver string la lista de categorias
    }
}