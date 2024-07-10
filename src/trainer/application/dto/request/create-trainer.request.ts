import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class CreateTrainerRequest implements ServiceRequestDto {

    constructor(
        readonly name: string,
        readonly location: string
    ) {}

    dataToString(): string {
        return `CreateTrainerReq: { name: ${this.name} | location: ${this.location} }`
    }
}