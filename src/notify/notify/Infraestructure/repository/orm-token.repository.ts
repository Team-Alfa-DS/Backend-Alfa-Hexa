/*import { Token } from '../entities/token.entity';
import { Repository, DataSource} from 'typeorm';
import { TokenRepository } from '../../domain/repositories/token-repository.interface';
import { NotifyMapper } from "../mappers/notify-mapper";
import { Result } from 'src/common/domain/result-handler/result';


export class TokenRepositoryImpl extends Repository<Token> implements TokenRepository{
    private readonly Notifymapper: NotifyMapper;

    constructor(datasource: DataSource, Notifymapper: NotifyMapper){
        super(Token, datasource.createEntityManager());
        this.Notifymapper = Notifymapper;
    }
    async savetoken(token: Token): Promise<Result<void>>
    {
        try{
            await this.save(token);
            return Result.success<void>(null, 200);
        }
        catch(err){
            return Result.fail<void>(new Error(err.mensage), err.code, err.mensage);
        }
    }
  }*/
