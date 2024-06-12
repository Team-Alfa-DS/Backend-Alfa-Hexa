import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class FollowTrainerRequest implements ServiceRequestDto {

    constructor(
        readonly idTrainer: string, 
        readonly idUser: string
    ) {}

    dataToString(): string {
        return `FollowTrainerReq: { idTrainer: ${this.idTrainer} | idUser: ${this.idUser} }`
    }
}