import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class FindOneTrainerRequest implements ServiceRequestDto {

    constructor(
        readonly id: string,
        readonly userId: string
    ) {}

    dataToString(): string {
        return `FindOneTrainerReq: { idTrainer: ${this.id} | userId: ${this.userId} }`
    }
}