import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../repository/INotifyrepository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class CountUnreadNotificationService implements IService<CountUnreadNotificationRequest, CountUnreadNotificationResponse>{
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'notifycountnotreaded';
    }

    async execute(input: CountUnreadNotificationRequest): Promise<Result<CountUnreadNotificationResponse>> {
        try {
            const result = await this.repository.countnotreaded();

            if(!result.isSuccess) {
                return Result.fail(result.Error)
            }

            const count = result.Value;
            return Result.success(new CountUnreadNotificationResponse(count));
        }
        catch(err){
            return Result.fail(new Error(err.message));
        }

    }
}

export class CountUnreadNotificationRequest implements ServiceRequestDto {
    
    dataToString(): string {
        return `CountUnreadNotificationRequest: { }`;
    }
}

export class CountUnreadNotificationResponse implements ServiceResponseDto {
    constructor(
        readonly count: number
    ) {}
    
    dataToString(): string {
        return `CountUnreadNotificationRequest: { count: ${this.count} }`
    }

}