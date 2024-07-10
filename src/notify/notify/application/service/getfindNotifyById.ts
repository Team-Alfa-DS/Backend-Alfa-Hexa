import { Notify } from "src/notify/notify/domain/notify";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class GetNotificationByIdService implements IService<GetNotificationByIdRequest, GetNotificationByIdResponse>{
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return this.constructor.name;
    }

    async execute(request: GetNotificationByIdRequest): Promise<Result<GetNotificationByIdResponse>> {
        try {
            const notify = await this.repository.findNotifyById(request.id);
            if(!notify.isSuccess) {
                return Result.fail(notify.Error)
            }
            return Result.success(new GetNotificationByIdResponse(
             notify.Value.Id,
             notify.Value.Title,
             notify.Value.Body,
             notify.Value.Date   
            ));
        } catch (error) {
            return Result.fail(error);
        }
    }
}

export class GetNotificationByIdRequest implements ServiceRequestDto {
    constructor(
        readonly id: string
    ) {}
    
    dataToString(): string {
        return `GetNotificationByIdRequest: {id: ${this.id}}`
    }
    
}

export class GetNotificationByIdResponse implements ServiceResponseDto {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly body: string,
        readonly date: Date
    ) {}

    dataToString(): string {
        return `GetNotificationByIdResponse: ${JSON.stringify(this)}`
    }
    
}