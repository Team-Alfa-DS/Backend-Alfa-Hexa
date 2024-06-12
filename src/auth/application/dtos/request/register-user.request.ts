import { ServiceRequestDto } from "src/common/application/interfaces/IService";
import { UserRole } from "src/user/domain/enums/role-user.type";

export class RegisterUserRequest implements ServiceRequestDto {
    
    constructor(
        readonly email: string,
        readonly name: string,
        readonly password: string,
        readonly phone: string,
        readonly type: UserRole
    ){}

    dataToString(): string {
        return `RegisterUserReq: { email: ${this.email} | name: ${this.name} | password: ${this.password} | phone: ${this.phone} | type: ${this.type} }`
    }
}