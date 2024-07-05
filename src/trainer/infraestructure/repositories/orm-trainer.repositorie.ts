import { Trainer } from 'src/trainer/domain/trainer';
import { ITrainerRepository } from '../../domain/repositories/trainer-repository.interface';
import { DataSource, Repository } from 'typeorm';
import { OrmTrainer } from '../entities/trainer.entity';
import { IMapper } from 'src/common/application/mappers/mapper.interface';
import { Result } from 'src/common/domain/result-handler/result';
import { OrmUserRepository } from 'src/user/infraestructure/repositories/orm-user.repository';
import { OrmUserMapper } from 'src/user/infraestructure/mappers/orm-user.mapper';
import { DatabaseSingleton } from 'src/common/infraestructure/database/database.singleton';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';
import { FollowTrainerDto } from 'src/trainer/application/dto/followTrainer.dto';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';
import { UserId } from 'src/user/domain/value-objects/user-id';
import { OrmTrainerMapper } from '../mapper/orm-trainer.mapper';

export class OrmTrainerRepository
  extends Repository<OrmTrainer>
  implements ITrainerRepository
{
  private readonly ormTrainerMapper: OrmTrainerMapper = new OrmTrainerMapper();
  private userMapper: OrmUserMapper = new OrmUserMapper();
  private readonly userRepository: OrmUserRepository = new OrmUserRepository(
    this.userMapper,
    DatabaseSingleton.getInstance(),
  );
  private transactionHandler = new TransactionHandler(
    DatabaseSingleton.getInstance().createQueryRunner(),
  );

  constructor(
  
    dataSource: DataSource,
  ) {
    super(OrmTrainer, dataSource.manager);
  }

  async findTrainerById(id: TrainerId): Promise<Result<Trainer>> {
    let trainerId = id.trainerId;

    const trainer = await this.findOne({
      relations: {
        courses: true,
        blogs: true,
        users: true,
    },
  where: {
    id: trainerId,
  }});
    if (!trainer) {
      return Result.fail<Trainer>(
        new Error('Trainer not found'),
        404,
        'Trainer not found',
      );
    }

    const trainerDomain = await this.ormTrainerMapper.toDomain(trainer);
    const oneTrainer = Result.success<Trainer>(trainerDomain, 202);
    return oneTrainer;
  }

  async followTrainer(idTrainer: TrainerId, idUser: UserId): Promise<Result<Trainer>> {
    try {
      const trainer = await this.findTrainerById(idTrainer);  
      if (!trainer.isSuccess) return trainer;

      const user = await this.userRepository.findUserById(
        idUser,
        this.transactionHandler,
      );

      if (!user.isSuccess) return Result.fail(new Error('User not found'), 404, 'User not found');

      const ormTrainer = await this.ormTrainerMapper.toOrm(trainer.Value);

      const ormUser = await this.userMapper.toOrm(user.Value);

      const trainersWithUsers = await this.find({
        where: {
          id: ormTrainer.id,
        },
        relations: {
          users: true,
        },
      });
      const a = trainersWithUsers[0].users.find((user) => {
        if (user.id === ormUser.id) return true;
      });
      if (a) {
        return Result.fail(
          new Error('User already follow this trainer'),
          404,
          'User already follow this trainer',
        );
      }
      let array = [];
      for (let x = 0; x < trainersWithUsers[0].users.length; x++) {
        array.push(trainersWithUsers[0].users[x]);
      }
      array.push(ormUser);
      ormTrainer.users = array;
      await this.save(ormTrainer);
      return Result.success<Trainer>(trainer.Value, 200);
      
    } catch (err) {
      return Result.fail<Trainer>(
        new Error(err.message),
        err.code,
        err.message,
      );
    }
  }

  async findAllTrainers(filter?: string[], user?: string, page?: number, perpage?: number, userFollow?: boolean): Promise<Result<Trainer[]>> {
    let queryBuilder = this.createQueryBuilder("trainer")
      .leftJoinAndSelect("trainer.courses", "courses")
      .leftJoinAndSelect("trainer.blogs", "blogs")
      .leftJoinAndSelect("trainer.users", "users");
  
    if (userFollow) {
      queryBuilder = queryBuilder.where("trainer.userFollow >= :userFollow", { userFollow });
    }
  
    let trainers = await queryBuilder.getMany();
  
    if (perpage) {
      if (!page) { page = 0; }
      trainers = trainers.slice((page * perpage), ((page + 1) * perpage));
    }
  
    let trainerDomains = await this.ormTrainerMapper.arrayToDomain(trainers);
    return Result.success<Trainer[]>(trainerDomains, 200);
  }

  async countnotreaded(): Promise<Result<number>> {
    let count = await this.createQueryBuilder("trainer")
      .where("trainer.userFollow = 0")
      .getCount();
    return Result.success<number>(count, 200);
   
  }
}

 /* async updateTrainer(
    idTrainer: string,
    payload: string,
  ): Promise<Result<Trainer>> {
    const trainer = await this.findOneBy({ id: idTrainer });
    if (!trainer)
      return Result.fail<Trainer>(
        new Error('Trainer not found'),
        404,
        'Trainer not found',
      );
    const updatedTrainer = await this.save({ ...trainer, payload });
    const trainerDomain = await this.ormTrainerMapper.toDomain(updatedTrainer);
    return Result.success<Trainer>(trainerDomain, 200);
  }

  async saveTrainer(trainer: Trainer): Promise<Result<Trainer>> {
    try {
      const ormUser = await this.ormTrainerMapper.toOrm(trainer);
      await this.save(ormUser);
      return Result.success<Trainer>(trainer, 200);
    } catch (err) {
      return Result.fail<Trainer>(
        new Error(err.message),
        err.code,
        err.message,
      );
    }
  }

  async deleteTrainer(trainer: Trainer): Promise<Result<Trainer>> {
    const deleted = await this.delete({ id: trainer.Id });
    if (deleted.affected == 0) {
      return Result.fail<Trainer>(
        new Error('Trainer not found'),
        404,
        'Trainer not found',
      );
    }
    return Result.success<Trainer>(trainer, 200);
  }*/

