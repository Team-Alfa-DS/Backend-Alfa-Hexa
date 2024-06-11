import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class ChangeUserPasswordResponse implements ServiceResponseDto {

    constructor() {}

    dataToString(): string {
        return `ChangeUserPasswordRes: { }`
    }
}