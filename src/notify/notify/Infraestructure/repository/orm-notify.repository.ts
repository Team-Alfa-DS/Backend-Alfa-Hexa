import { DataSource, Repository } from "typeorm";
import { NotifyEntity } from "../entities/notify.entity";
import { INotifyRepository } from "../../application/repository/INotifyrepository";
import { Result } from "src/common/domain/result-handler/result";
import { IMapper } from "src/common/application/mappers/mappers.interface";
import { NotifyMapper } from "../mappers/notify-mapper";


export class OrmNotifyRepository extends Repository<NotifyEntity> implements INotifyRepository{
    private readonly Notifymapper: NotifyMapper;

    constructor(datasource: DataSource, Notifymapper: NotifyMapper){
        super(NotifyEntity, datasource.createEntityManager());
        this.Notifymapper = Notifymapper;
    }

     async getAllNotify(): Promise<Result<NotifyEntity[]>> {
            try{
             const result = await this.find();
             const notify = NotifyMapper.arrayToDomain(result);
             return Result.success<NotifyEntity[]>(notify, 200)
               
        }
        catch(error){
            return Result.fail<NotifyEntity[]>(new Error('Notifys not found'), 404, "Notifys not found");
        }
    }

    async findNotifyById(id: string): Promise<Result<NotifyEntity>> {
        try{
            const notifyfound = await this.findOne({where: {id: id}});
            if(!notifyfound)
                return Result.fail<NotifyEntity>(null, 404, 'Notify not found');
            const notify = NotifyMapper.toDomain(notifyfound);
            return Result.success<NotifyEntity>(notify, 200);
        }
        catch(err){
            return Result.fail<NotifyEntity>(new Error(err.message), 500, err.message);
        }
}

   /* async saveNotify(notify: string): Promise<Result<string>> {
        try {
            const ormNotify = await this.Notifymapper.toOrm(notify);
            return Result.success<string>(notify, 200);
        }
        catch(err){
            return Result.fail<string>(new Error(err.mensage), err.code, err.mensage);
        }

    }*/

   async deleteAllNotify(): Promise<Result<void>> {
        try {
            this.clear();
            return Result.success<void>(null, 200);
        }
        catch(err){
            return Result.fail<void>(new Error(err.mensage), err.code, err.mensage);
        }
    }

    async countnotreaded(): Promise<Result<number>> {
        const count = await this.createQueryBuilder("notify")
        .where('notify.userReaded = :userReaded',{ userReaded : false})
        .getCount();
        if(!count){
           return Result.fail<number>(null, 404, 'Notify not found')
        }
        return Result.success<number>(count, 200)    
}
}