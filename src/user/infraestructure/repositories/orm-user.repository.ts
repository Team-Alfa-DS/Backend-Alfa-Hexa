import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { User } from "src/user/domain/user";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";

export class OrmUserRepository extends Repository<UserEntity> implements IUserRepository {

    private readonly ormUserMapper: IMapper<User, UserEntity>;

    constructor(ormUserMapper: IMapper<User, UserEntity>, dataSource: DataSource) {
        super(UserEntity, dataSource.manager);
        this.ormUserMapper = ormUserMapper;
    }

    async updatePassword(email: string, password: string, runner: TransactionHandler): Promise<Result<User>> {
        const runnerTransaction = runner.getRunner();
        const userfound = await runnerTransaction.manager.findOneBy(UserEntity, {email});
        if (!userfound) {
            return Result.fail(new Error('User not found'), 404, 'User not found');
        }
        const userUpdated = await runnerTransaction.manager.save(UserEntity, {...userfound, password});
        const domainUser = await this.ormUserMapper.toDomain(userUpdated);
        return Result.success<User>(domainUser, 200);
    }

    async findUserById(id: string, runner: TransactionHandler): Promise<Result<User>> {
        const runnerTransaction = runner.getRunner();

        const userfound = await runnerTransaction.manager.findOneBy(UserEntity, {id});

        if (!userfound) {
            return Result.fail<User>(new Error('User not found'), 404, 'User not found');
        }

        const domainUser = await this.ormUserMapper.toDomain(userfound);
        return Result.success<User>(domainUser, 200);
    }

    async findUserByEmail(email: string, runner: TransactionHandler): Promise<Result<User>> {
        const runnerTransaction = runner.getRunner();
        const userfound = await runnerTransaction.manager.findOneBy(UserEntity, {email});

        if (!userfound) {
            return Result.fail<User>(new Error('User not found'), 404, 'User not found');
        }

        const domainUser = await this.ormUserMapper.toDomain(userfound);
        return Result.success<User>(domainUser, 200);
    }

    async saveUser(user: User, runner: TransactionHandler): Promise<Result<User>> {

        try {
            const runnerTransaction = runner.getRunner();
            const ormUser = await this.ormUserMapper.toOrm(user);
            await runnerTransaction.manager.save(ormUser);
            return Result.success<User>(user, 200);

        } catch (err) {
            return Result.fail<User>(new Error(err.message), err.code, err.message);
        }
    }

}