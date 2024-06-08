import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class FollowTrainerResponse implements ServiceResponseDto {

    constructor() {}

    dataToString(): string {
        return `FollowTrainerRes: {  }`
    }

}