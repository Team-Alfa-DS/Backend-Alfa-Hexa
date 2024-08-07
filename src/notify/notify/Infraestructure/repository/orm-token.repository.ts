import { TokenRepository } from "src/notify/notify/application/repository/ItokenRepository";
import { NotifyMapper } from "../mappers/notify-mapper";
import { Result } from 'src/common/domain/result-handler/result';
import { TokenEntity } from "../entities/token.entity";
import { Repository } from "typeorm";
import { OrmUserEntity } from "src/user/infraestructure/entities/orm-entities/orm-user.entity";
import { DataSource } from "typeorm";
import { FirebaseNotifier } from "src/common/infraestructure/Firebase-notification/firebase-notification";
import { response } from "express";


export class TokenRepositoryImpl extends Repository<TokenEntity> implements TokenRepository{
    private readonly Notifymapper: NotifyMapper;
    private readonly firebaseNotifier: FirebaseNotifier;

    constructor(datasource: DataSource, Notifymapper: NotifyMapper, firebaseNotifier: FirebaseNotifier){
        super(TokenEntity, datasource.createEntityManager());
        this.Notifymapper = Notifymapper;
        this.firebaseNotifier = firebaseNotifier;
    }
    async savetoken(token: string, userId: string): Promise<Result<void>>
    {
        try{
            const user = await this.manager.findOne(OrmUserEntity,{where: {id: userId}});
            if(!user)
                return Result.fail<void>(new Error('User not found') );
            const tokenEntity = TokenEntity.create(token, user);
            await this.save(tokenEntity);
            const response = await this.firebaseNotifier.notify(token);
            return Result.success<void>(null);
        }
        catch(err){
            return Result.fail<void>(new Error(err.mensage));
        }
    }
  }
