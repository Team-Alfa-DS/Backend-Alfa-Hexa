import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { ForgetUserPasswordDto } from "../dtos/forget-user-password.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IMailer } from "src/common/application/mailer/mailer.interface";

export class ForgetUserPasswordService implements IApplicationService<ForgetUserPasswordDto, any> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly mailer: IMailer;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, mailer: IMailer) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.mailer = mailer;
    }

    async execute(value: ForgetUserPasswordDto): Promise<Result<any>> {
        const user = await this.userRepository.findUserByEmail(value.email, this.transactionHandler);
        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message)
        }

        await this.mailer.sendMail('Codigo de seguridad', 'pruebas de email', user.Value.Email, value.code);

        const response = {
            date: new Date()
        }
        return Result.success(response, 200);
    }

    get name(): string {
        return this.constructor.name;
    }

}