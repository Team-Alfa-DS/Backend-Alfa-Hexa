import { IService } from "src/common/application/interfaces/IService";
import { ProfileProgressRequest } from "../dtos/request/profile-progress.request";
import { ProfileProgressResponse } from "../dtos/response/profile-progress.response";
import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export class ProfileProgressService extends IService<ProfileProgressRequest, ProfileProgressResponse> {

    private readonly progressRepository: IProgressRepository;
    // private readonly courseRepository: ICourseRepository;
    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(
        progressRepository: IProgressRepository,
        userRepository: IUserRepository,
        transactionHandler: ITransactionHandler
    ) {
        super();
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }

    async execute(value: ProfileProgressRequest): Promise<Result<ProfileProgressResponse>> {
        const user = await this.userRepository.findUserById(value.userId, this.transactionHandler);
        throw new Error('wenas');
    }

}