import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class CurrentUserResponse implements ServiceResponseDto {
    constructor(
        readonly id: string,
        readonly email: string,
        readonly name: string,
        readonly phone: string,
        readonly image: string,
    ) {}

    dataToString(): string {
        return `CurrentUserRes: { id: ${this.id} | email: ${this.email} | name: ${this.name} | phone: ${this.phone} | image: ${this.image} }`
    }
}