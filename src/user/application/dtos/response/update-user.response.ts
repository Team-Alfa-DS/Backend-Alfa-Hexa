import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class UpdateUserResponse implements ServiceResponseDto {

    constructor(readonly id: string) {}

    dataToString(): string {
        return `userUpdated: { id: ${this.id} }`
    }
}