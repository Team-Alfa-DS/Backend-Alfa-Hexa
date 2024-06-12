import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class CurrentUserRequest implements ServiceRequestDto {
    
    constructor(readonly id: string) {}

    dataToString(): string {
        return `CurrentUserReq: { id: ${this.id} }`
    }   
}