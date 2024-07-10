import { DataSource, Repository } from "typeorm";
import { OrmUserEntity } from "../entities/orm-entities/orm-user.entity";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { User } from "src/user/domain/user";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserId } from "src/user/domain/value-objects/user-id";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { UserNotFoundException } from "src/user/domain/exceptions/user-not-found-exception";

export class OrmUserRepository extends Repository<OrmUserEntity> implements IUserRepository {

    private readonly ormUserMapper: IMapper<User, OrmUserEntity>;

    constructor(ormUserMapper: IMapper<User, OrmUserEntity>, dataSource: DataSource) {
        super(OrmUserEntity, dataSource.manager);
        this.ormUserMapper = ormUserMapper;
    }

    async findUserById(id: UserId, runner: TransactionHandler): Promise<Result<User>> {
        const runnerTransaction = runner.getRunner();

        const userfound = await runnerTransaction.manager.findOneBy(OrmUserEntity, {id: id.Id});

        if (!userfound) {
            return Result.fail<User>(new UserNotFoundException(`Usuario con el id ${id.Id} no encontrado`));
        }

        if (userfound.image) {
            userfound.image = Buffer.from(userfound.image).toString('base64url');
        }

        const domainUser = await this.ormUserMapper.toDomain(userfound);
        return Result.success<User>(domainUser);
    }

    async findUserByEmail(email: UserEmail, runner: TransactionHandler): Promise<Result<User>> {
        const runnerTransaction = runner.getRunner();
        const userfound = await runnerTransaction.manager.findOneBy(OrmUserEntity, {email: email.Email});

        if (!userfound) {
            return Result.fail<User>(new UserNotFoundException(`Usuario con el email ${email.Email} no encontrado`));
        }

        if (userfound.image) {
            userfound.image = Buffer.from(userfound.image).toString('base64url');
        }

        const domainUser = await this.ormUserMapper.toDomain(userfound);
        return Result.success<User>(domainUser);
    }

    async saveUser(user: User, runner: TransactionHandler): Promise<Result<User>> {

        try {
            const runnerTransaction = runner.getRunner();
            const ormUser = await this.ormUserMapper.toPersistence(user);
            await runnerTransaction.manager.save(ormUser);
            return Result.success<User>(user);

        } catch (err) {
            return Result.fail<User>(new Error(err.message));
        }
    }

}