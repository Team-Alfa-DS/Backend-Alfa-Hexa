import { RegisterUserRequest } from "src/auth/application/dtos/request/register-user.request"
import { RegisterUserService } from "src/auth/application/services/register-user.service";
import { BcryptEncryptor } from "src/auth/infraestructure/encryptor/bcrypt";
import { UuidGen } from "src/common/infraestructure/id-gen/uuid-gen";
import { UserRole } from "src/user/domain/enums/role-user.type"
import { InvalidUserEmailException } from "src/user/domain/exceptions/invalid-user-email.exception";
import { InvalidUserNameException } from "src/user/domain/exceptions/invalid-user-name.exception";
import { InvalidUserPasswordException } from "src/user/domain/exceptions/invalid-user-password.exception";
import { InvalidUserPhoneException } from "src/user/domain/exceptions/invalid-user-phone.exception";
import { EventBusMock } from "test/common/event-manager/event-bus.mock";
import { OdmUserRepositoryMock } from "test/common/repositories-mocks/odm-user-repository.mock";
import { OrmUserRepositoryMock } from "test/common/repositories-mocks/orm-user-repository.mock";
import { TransactionHandlerMock } from "test/common/transaction-handler-mock/transaction-handler.mock";

describe('User Register', () => {
    it('debe registrar un usuario', async () => {
        const request = new RegisterUserRequest('dbcd@gmail.com', 'Daniel Bortot', '12345', '12345678910', UserRole.CLIENT);
        const registerUserService = new RegisterUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new UuidGen(),
            new EventBusMock()
        )
        const response = await registerUserService.execute(request);
        expect(response.isSuccess).toBeTruthy();
    })

    it('debe fallar si no hay un email', async () => {
        const request = new RegisterUserRequest('', 'Daniel Bortot', '12345', '12345678910', UserRole.CLIENT);
        const registerUserService = new RegisterUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new UuidGen(),
            new EventBusMock()
        )
        try {
            const res = await registerUserService.execute(request);
            expect(res.Error).toBeInstanceOf(InvalidUserEmailException);
        } catch (err) {
        }
        expect.assertions(1)
    })

    it('debe fallar si no hay un nombre', async () => {
        const request = new RegisterUserRequest('dbcd@gmail.com', '', '12345', '12345678910', UserRole.CLIENT);
        const registerUserService = new RegisterUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new UuidGen(),
            new EventBusMock()
        )
        try {
            const res = await registerUserService.execute(request);
            expect(res.Error).toBeInstanceOf(InvalidUserNameException);
        } catch (err) {
        }
        expect.assertions(1)
    })

    it('debe fallar si no hay una contraseña', async () => {
        const request = new RegisterUserRequest('dbcd@gmail.com', 'Daniel Bortot', '', '12345678910', UserRole.CLIENT);
        const registerUserService = new RegisterUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new UuidGen(),
            new EventBusMock()
        )
        try {
            const res = await registerUserService.execute(request);
            expect(res.Error).toBeInstanceOf(InvalidUserPasswordException);
        } catch (err) {
        }
        expect.assertions(1)
    })

    it('debe fallar si no hay un numero de telefono', async () => {
        const request = new RegisterUserRequest('dbcd@gmail.com', 'Daniel Bortot', '12345', '', UserRole.CLIENT);
        const registerUserService = new RegisterUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new UuidGen(),
            new EventBusMock()
        )
        try {
            const res = await registerUserService.execute(request);
            expect(res.Error).toBeInstanceOf(InvalidUserPhoneException);
        } catch (err) {
        }
        expect.assertions(1)
    })

    it('debe fallar si no se cumple el formato del email', async () => {
        const request = new RegisterUserRequest('dabortot.21@gmail', 'Daniel Bortot', '123456', '12345678910', UserRole.CLIENT);
        const registerUserService = new RegisterUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new UuidGen(),
            new EventBusMock()
        )
        try {
            const res = await registerUserService.execute(request);
            expect(res.Error).toBeInstanceOf(InvalidUserEmailException)
        } catch (err) {
        }
        expect.assertions(1)
    })
})