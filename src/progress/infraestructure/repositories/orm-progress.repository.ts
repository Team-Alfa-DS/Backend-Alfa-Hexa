import { DataSource, Repository } from "typeorm";
import { ProgressEntity } from "../entities/progress.entity";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Progress } from "src/progress/domain/progress";
import { IMapper } from "src/common/application/mappers/mapper.interface";


export class OrmProgressRepository extends Repository<ProgressEntity> implements IProgressRepository {

    private readonly ormProgressMapper: IMapper<Progress, ProgressEntity>;

    constructor(ormProgressMapper: IMapper<Progress, ProgressEntity>, dataSource: DataSource) {
        super(ProgressEntity, dataSource.manager);
        this.ormProgressMapper = ormProgressMapper;
    }

    saveProgress(progress: Progress, runner: ITransactionHandler): Promise<Result<Progress>> {
        throw new Error("Method not implemented.");
    }
    findProgressByUser(id: string, runner: ITransactionHandler): Promise<Result<Progress>> {
        throw new Error("Method not implemented.");
    }
}