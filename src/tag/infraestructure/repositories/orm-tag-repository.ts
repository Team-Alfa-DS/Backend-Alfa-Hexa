import { ITagRepository } from "../../application/ITagRepository";
import { Result } from "src/common/domain/result-handler/result";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { Tag } from "../entities/tag.entity";
import { DataSource, Repository } from "typeorm";

export class OrmTagRepository extends Repository<Tag> implements ITagRepository {
    
    constructor(dataSource: DataSource){
        super(Tag,dataSource.manager);
    }

    async getAllTags(runner: TransactionHandler): Promise<Result<string[]>> {
        const runnerTransaction = runner.getRunner();
    
        const result: Tag[] = await runnerTransaction.manager.createQueryBuilder(Tag, "tag").getMany();
        
        if (!result) {
            return Result.fail<string[]>(new Error('Tags not found'), 404, 'Tags not found');
        }

        const tagNames: string[] = result.map(tag => tag.name);
    
        return Result.success<string[]>(tagNames, 200);
    }
}	