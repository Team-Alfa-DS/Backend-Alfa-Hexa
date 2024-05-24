/*import { Notify } from "src/notify/notify/domain/notify";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";

export class notifycountnotreaded implements IApplicationService<void, Notify[]>{
    private readonly repository: INotifyRepository;
    private readonly notify: Notify;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'notifycountnotreaded';
    }

    async execute(): Promise<Result<Notify[]>> {

        const count = await this.createQueryBuilder('notify').getCount();
        return Result.success<Notify[]>(count, 200);


    }


}*/