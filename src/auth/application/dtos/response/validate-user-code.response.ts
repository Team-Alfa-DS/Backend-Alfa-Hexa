import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class ValidateUserCodeResponse implements ServiceResponseDto {

    constructor() {}

    dataToString(): string {
        return `ValidateUserCodeRes: { }`
    }
}