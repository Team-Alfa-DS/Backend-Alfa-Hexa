import { ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Trainer } from "src/trainer/domain/trainer";

export class FindOneTrainerResponse implements ServiceResponseDto {

    constructor(
        readonly id: string,
        readonly name: string,
        readonly followers: number,
        readonly userFollow: boolean,
        readonly location: string
    ) {}

    dataToString(): string {
        return `FindOneTrainerRes: { name: ${this.name} | id: ${this.id} | followers: ${this.followers} | userFollow: ${this.userFollow} | location: ${this.location} }`
    }
}