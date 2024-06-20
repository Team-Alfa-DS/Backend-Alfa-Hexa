import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IMailer } from "src/common/application/mailer/mailer.interface";
import { IService } from "src/common/application/interfaces/IService";
import { ForgetUserPasswordRequest } from "../dtos/request/forget-user-password.request";
import { ForgetUserPasswordResponse } from "../dtos/response/forget-user-password.response";

export class ForgetUserPasswordService extends IService<ForgetUserPasswordRequest, ForgetUserPasswordResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly mailer: IMailer;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, mailer: IMailer) {
        super();
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.mailer = mailer;
    }

    async execute(value: ForgetUserPasswordRequest): Promise<Result<ForgetUserPasswordResponse>> {
        const user = await this.userRepository.findUserByEmail(value.email, this.transactionHandler);
        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message)
        }

        await this.mailer.sendMail('Codigo de seguridad', 'Envio de código de verificación', user.Value.Email.Email, value.code);

        const response = new ForgetUserPasswordResponse(new Date());
        return Result.success(response, 200);
    }
}