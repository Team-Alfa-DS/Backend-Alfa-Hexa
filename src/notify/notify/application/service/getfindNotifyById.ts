import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../repository/INotifyrepository";
import { NotifyEntity } from "../../Infraestructure/entities/notify.entity";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class getfindNotifyById implements IService<getfindNotifyByIdRequest, getfindNotifyByIdResponse> {
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'getfindNotifyById';
    }

    async execute(id: getfindNotifyByIdRequest): Promise<Result<getfindNotifyByIdResponse>> {
        const notify = await this.repository.findNotifyById(id.id);
        if(!notify) {
            return Result.fail<getfindNotifyByIdResponse>(notify.Error)
        }
        const response = new getfindNotifyByIdResponse(
            notify.Value.id,
            notify.Value.title,
            notify.Value.body,
            notify.Value.date
        )
        return Result.success<getfindNotifyByIdResponse>(response);
    }
}

export class getfindNotifyByIdRequest implements ServiceRequestDto{
    constructor(readonly id: string) {}

    dataToString(): string {
        return `getfindNotifyByIdRequest: {id: ${this.id}}`;
    }
}

export class getfindNotifyByIdResponse implements ServiceResponseDto {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly date: Date;
    constructor(
        id: string,
        title: string,
        body: string,
        date: Date
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.date = date;
    }

    dataToString(): string {
        return `getfindNotifyByIdResponse: ${JSON.stringify(this)}`;
    }
}