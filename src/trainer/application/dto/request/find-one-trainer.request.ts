import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class FindOneTrainerRequest implements ServiceRequestDto {

    constructor(readonly id: string) {}

    dataToString(): string {
        return `FindOneTrainerReq: { id: ${this.id} }`
    }
}