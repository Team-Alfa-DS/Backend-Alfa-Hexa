import { Result } from "src/common/domain/result-handler/result";
import { IMailer } from "src/common/application/mailer/mailer.interface";
import { IService } from "src/common/application/interfaces/IService";
import { ForgetUserPasswordRequest } from "../dtos/request/forget-user-password.request";
import { ForgetUserPasswordResponse } from "../dtos/response/forget-user-password.response";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";

export class ForgetUserPasswordService extends IService<ForgetUserPasswordRequest, ForgetUserPasswordResponse> {

    private readonly userRepository: IOdmUserRepository;
    private readonly mailer: IMailer;

    constructor(userRepository: IOdmUserRepository, mailer: IMailer) {
        super();
        this.userRepository = userRepository;
        this.mailer = mailer;
    }

    async execute(value: ForgetUserPasswordRequest): Promise<Result<ForgetUserPasswordResponse>> {
        try {
            const user = await this.userRepository.findUserByEmail(UserEmail.create(value.email));
            if (!user.isSuccess) {
                return Result.fail(user.Error)
            }

            await this.mailer.sendCodeMail('Codigo de seguridad', 'Envio de código de verificación', user.Value.Email.Email, value.code);

            const response = new ForgetUserPasswordResponse(new Date());
            return Result.success(response);
        } catch (error) {
            return Result.fail(error);
        }
    }
}