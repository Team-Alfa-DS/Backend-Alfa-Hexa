import { ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class CreateTrainerResponse implements ServiceResponseDto {

    constructor(
    ) {}

    dataToString(): string {
        return `CreateTrainerRes: { }`
    }
}