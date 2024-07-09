import { RegisterUserRequest } from "src/auth/application/dtos/request/register-user.request"
import { RegisterUserService } from "src/auth/application/services/register-user.service";
import { UserRole } from "src/user/domain/enums/role-user.type"

describe('Register User', async () => {
    it('debe registrar un usuario', async () => {
        const body = new RegisterUserRequest('dabortot.21@est.ucab.edu.ve', 'Daniel Bortot', '123456', '04142548764', UserRole.CLIENT);
        const registerUserService = new RegisterUserService()
    })
})