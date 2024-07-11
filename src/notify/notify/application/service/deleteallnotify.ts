import { INotifyRepository} from "../repository/INotifyrepository";
import { NotifyEntity } from "../../Infraestructure/entities/notify.entity";
import { Result } from "src/common/domain/result-handler/result";

export class deleteallNotify {
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'deleteallNotify';
    }

    async execute(): Promise<Result<void>> {
        const notify = await this.repository.deleteAllNotify();
        if(!notify) {
            return Result.fail<void>(notify.Error)
        }
        return Result.success<void>(null);
    }
}