import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class UpdateUserRequest implements ServiceRequestDto {
    
    constructor(
        readonly id: string,
        readonly name?: string,
        readonly email?: string,
        readonly password?: string,
        readonly phone?: string,
        readonly image?: string
    ) {

        }

    dataToString(): string {
        return `UserUpdate: { id: ${this.id} | name: ${this.name} | email: ${this.email} | password: ${this.password} | phone: ${this.phone} }`
    }
}