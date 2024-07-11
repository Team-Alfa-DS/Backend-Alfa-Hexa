import { IService, ServiceRequestDto, ServiceResponseDto} from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../repository/INotifyrepository";
import { NotifyEntity } from "../../Infraestructure/entities/notify.entity";

export class GetAllNotify implements IService<getAllNotifyRequest, getAllNotifyResponse> {
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'GetAllNotify';
    }

    async execute(request: getAllNotifyRequest): Promise<Result<getAllNotifyResponse>> {
        let result = await this.repository.getAllNotify();
        let n = result.Value;
        let page = 0;
        if(request.page){
            if(request.page){
                page = request.page;
            }
            n = n.slice((page*request.perpage), ((request.perpage) + page*request.perpage));
    }

    const response = n.map(NotifyEntity => ({
        id: NotifyEntity.id,
        title: NotifyEntity.title,
        description: NotifyEntity.body,
        date: NotifyEntity.date,
        readed: NotifyEntity.userReaded
    }));
    return Result.success<getAllNotifyResponse>(new getAllNotifyResponse(response));
    }
}

export class getAllNotifyRequest implements ServiceRequestDto{
    readonly page: number;
    readonly perpage: number;

    constructor(
        page: number,
        perpage: number
    ) {
        if(page){
            if(!page){page = 0}
            this.page = page;
            this.perpage = perpage;
        }
    }

    dataToString(): string {
        return `Query: {page: ${this.page} | perpage: ${this.perpage} }`;
    }
}

export class getAllNotifyResponse implements ServiceResponseDto {
    readonly notify:{
        id: string;
        title: string;
        description: string;
        date: Date;
        readed: boolean;
    }[];
    constructor(notify: {
        id: string;
        title: string;
        description: string;
        date: Date;
        readed: boolean;
    }[]) {
        this.notify = notify;
    }
    
    dataToString(): string {
        return `getAllNotifyResponse: ${JSON.stringify(this)}`;
    }
}