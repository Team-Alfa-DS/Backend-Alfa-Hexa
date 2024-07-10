import { DataSource, Repository } from "typeorm";
import { NotifyEntity } from "../entities/notify.entity";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { Notify } from "src/notify/notify/domain/notify";
import { IMapper } from "src/common/application/mappers/mappers.interface";
import { NotifyMapper } from "../mappers/notify-mapper";


export class OrmNotifyRepository extends Repository<NotifyEntity> implements INotifyRepository {
    private readonly Notifymapper: NotifyMapper;

    constructor(datasource: DataSource, Notifymapper: NotifyMapper){
        super(NotifyEntity, datasource.createEntityManager());
        this.Notifymapper = Notifymapper;
    }

     async getAllNotify(): Promise<Result<Notify[]>> {
            try{
             const result = await this.find();
             const notify = NotifyMapper.arrayToDomain(result);
             return Result.success<Notify[]>(notify)
               
        }
        catch(error){
            return Result.fail<Notify[]>(new Error('Notifys not found'));
        }
    }

    async findNotifyById(id: string): Promise<Result<Notify>> {
        try{
            const notifyfound = await this.findOne({where: {id: id}});
            if(!notifyfound)
                return Result.fail<Notify>(null);
            const notify = NotifyMapper.toDomain(notifyfound);
            return Result.success<Notify>(notify);
        }
        catch(err){
            return Result.fail<Notify>(new Error(err.message));
        }
}

    async saveNotify(notify: Notify): Promise<Result<Notify>> {
        try {
            const ormNotify = await this.Notifymapper.toPersistence(notify);
            return Result.success<Notify>(notify);
        }
        catch(err){
            return Result.fail<Notify>(new Error(err.mensage));
        }

    }

   async deleteAllNotify(): Promise<Result<void>> {
        try {
            this.clear();
            return Result.success<void>(null);
        }
        catch(err){
            return Result.fail<void>(new Error(err.mensage));
        }
    }

    async countnotreaded(): Promise<Result<number>> {
        const count = await this.createQueryBuilder("notify")
        .where('notify.userReaded = :userReaded',{ userReaded : false})
        .getCount();
        if(!count){
           return Result.fail<number>(null)
        }
        return Result.success<number>(count)    
}
}