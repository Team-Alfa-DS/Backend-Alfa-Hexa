import { ServiceResponseDto } from "src/common/application/interfaces/IService"

type UserResponse = {
    id: string,
    email: string,
    name: string,
    phone: string
}

export class LoginUserResponse implements ServiceResponseDto {

    constructor(
        readonly user: UserResponse,
        readonly token: string,
        readonly type: string
    ) {}

    dataToString(): string {
        return `LoginUserRes: { user: { id: ${this.user.id} | email: ${this.user.email} | name: ${this.user.name} | phone: ${this.user.phone} } | token: ${this.token} | type: ${this.type} }`
    }

}