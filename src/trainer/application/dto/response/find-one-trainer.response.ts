import { ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Trainer } from "src/trainer/domain/trainer";

export class FindOneTrainerResponse implements ServiceResponseDto {

    constructor(readonly trainer: Trainer) {}

    dataToString(): string {
        return `FindOneTrainerRes: { name: ${this.trainer.Name} | id: ${this.trainer.Id} | followers: ${this.trainer.Followers} }`
    }
}