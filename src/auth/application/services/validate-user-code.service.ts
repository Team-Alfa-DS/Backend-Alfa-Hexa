import { Result } from "src/common/domain/result-handler/result";
import { IService } from "src/common/application/interfaces/IService";
import { ValidateUserCodeRequest } from "../dtos/request/validate-user-code.request";
import { ValidateUserCodeResponse } from "../dtos/response/validate-user-code.response";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";

export class ValidateUserCodeService extends IService<ValidateUserCodeRequest, ValidateUserCodeResponse> {

    private readonly userRepository: IOdmUserRepository;

    constructor(userRepository: IOdmUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    async execute(value: ValidateUserCodeRequest): Promise<Result<ValidateUserCodeResponse>> {
        try {
            const user = await this.userRepository.findUserByEmail(UserEmail.create(value.email));
            if (!user.isSuccess) {
                return Result.fail(user.Error)
            }
            
            if (value.code != value.codeSaved) {
                return Result.fail(new Error('El codigo no es correcto'));
            }
            const response = new ValidateUserCodeResponse();
            return Result.success(response);
        } catch (error) {
            return Result.fail(error)
        }
    }
}