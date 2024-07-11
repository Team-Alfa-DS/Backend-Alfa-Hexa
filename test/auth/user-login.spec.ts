import { JwtService } from "@nestjs/jwt"
import { LoginUserRequest } from "src/auth/application/dtos/request/login-user.request"
import { LoginUserResponse } from "src/auth/application/dtos/response/login-user.response"
import { LoginUserService } from "src/auth/application/services/login-user.service"
import { UserRole } from "src/user/domain/enums/role-user.type"
import { InvalidUserEmailException } from "src/user/domain/exceptions/invalid-user-email.exception"
import { EncryptMock } from "test/common/encrypt-mock/encrypt.mock"
import { JwtGenMock } from "test/common/jwt-gen-mock/jwt-gen.mock"
import { OdmUserRepositoryMock } from "test/common/repositories-mocks/odm-user-repository.mock"

describe('User Login', async () => {
    it('debe de fallar si se envia un formato incorrecto de email', async () => {
        const request = new LoginUserRequest('dbcd@gmail', '12345')
        const loginuserService = new LoginUserService(
            new OdmUserRepositoryMock(),
            new EncryptMock(),
            new JwtGenMock(new JwtService())
        )

        try {
            await loginuserService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidUserEmailException);
        }
    })

    it('debe de devolver la informacion del usuario', async () => {
        const request = new LoginUserRequest('dbcd@gmail.com', '12345')
        const loginuserService = new LoginUserService(
            new OdmUserRepositoryMock(),
            new EncryptMock(),
            new JwtGenMock(new JwtService())
        )

        const response = await loginuserService.execute(request);
        expect(response.isSuccess).toBeTruthy();
        expect(response.Value).toBe(
            new LoginUserResponse({
                id: '244fbecc-2127-433d-ba76-762fb2fee1c8', 
                email: 'dbcd@gmail.com', 
                name: 'Daniel Bortot', 
                phone: '12345678910'
            }, 
            'jwt code', 
            UserRole.CLIENT
            )
        );
        expect.assertions(2);
    })

    it('debe de fallar al enviar una contraseña incorrecta', async () => {
        const request = new LoginUserRequest('dbcd@gmail.com', '334242')
        const loginuserService = new LoginUserService(
            new OdmUserRepositoryMock(),
            new EncryptMock(),
            new JwtGenMock(new JwtService())
        )

        const response = await loginuserService.execute(request);
        expect(response.Error).toBe('La contraseña es incorrecta');
        expect.assertions(1);
    })
})