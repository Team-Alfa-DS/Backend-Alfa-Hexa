import { BcryptEncryptor } from "src/auth/infraestructure/encryptor/bcrypt"
import { UpdateUserRequest } from "src/user/application/dtos/request/update-user.request"
import { UpdateUserService } from "src/user/application/services/update-user.application.service"
import { InvalidUserEmailException } from "src/user/domain/exceptions/invalid-user-email.exception"
import { InvalidUserNameException } from "src/user/domain/exceptions/invalid-user-name.exception"
import { InvalidUserPhoneException } from "src/user/domain/exceptions/invalid-user-phone.exception"
import { EventBusMock } from "test/common/event-manager/event-bus.mock"
import { OdmUserRepositoryMock } from "test/common/repositories-mocks/odm-user-repository.mock"
import { OrmUserRepositoryMock } from "test/common/repositories-mocks/orm-user-repository.mock"
import { TransactionHandlerMock } from "test/common/transaction-handler-mock/transaction-handler.mock"

describe('User Update', () => {
    it('debe fallar si no se envia un formato de nombre correcto a un usuario existente', async () => {
        const request = new UpdateUserRequest('244fbecc-2127-433d-ba76-762fb2fee1c8', 'an', null, null, null, null);
        const updateUserService = new UpdateUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new EventBusMock()
        );
        try {
            await updateUserService.execute(request);
        } catch (err) {
            expect(err).toEqual(InvalidUserNameException);
        }

        expect.assertions(1);
    })

    it('debe fallar si no se envia un formato de email correcto a un usuario existente', async () => {
        const request = new UpdateUserRequest('244fbecc-2127-433d-ba76-762fb2fee1c8', null, 'abcd@gmail', null, null, null);
        const updateUserService = new UpdateUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new EventBusMock()
        );
        try {
            updateUserService.execute(request);
        } catch (err) {
            expect(err).toEqual(InvalidUserEmailException);
        }

        expect.assertions(1);
    })

    it('debe fallar si no se envia un formato de telefono correcto a un usuario existente', async () => {
        const request = new UpdateUserRequest('244fbecc-2127-433d-ba76-762fb2fee1c8', null, null, '12345', null, null);
        const updateUserService = new UpdateUserService(
            new OrmUserRepositoryMock(),
            new OdmUserRepositoryMock(),
            new TransactionHandlerMock(),
            new BcryptEncryptor(),
            new EventBusMock()
        );
        try {
            updateUserService.execute(request);
        } catch (err) {
            expect(err).toEqual(InvalidUserPhoneException);
        }

        expect.assertions(1);
    })
})