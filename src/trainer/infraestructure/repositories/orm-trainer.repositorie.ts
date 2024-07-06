import { Trainer } from 'src/trainer/domain/trainer';
import { ITrainerRepository } from '../../domain/repositories/trainer-repository.interface';
import { DataSource, Repository } from 'typeorm';
import { OrmTrainerEntity } from '../entities/orm-entities/orm-trainer.entity';
import { IMapper } from 'src/common/application/mappers/mapper.interface';
import { Result } from 'src/common/domain/result-handler/result';
import { OrmUserRepository } from 'src/user/infraestructure/repositories/orm-user.repository';
import { OrmUserMapper } from 'src/user/infraestructure/mappers/orm-mappers/orm-user.mapper';
import { PgDatabaseSingleton } from 'src/common/infraestructure/database/pg-database.singleton';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';
import { FollowTrainerDto } from 'src/trainer/application/dto/followTrainer.dto';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';
import { UserId } from 'src/user/domain/value-objects/user-id';

export class OrmTrainerRepository
  extends Repository<OrmTrainerEntity>
  implements ITrainerRepository
{
  private readonly ormTrainerMapper: IMapper<Trainer, OrmTrainerEntity>;
  private userMapper: OrmUserMapper = new OrmUserMapper();
  private readonly userRepository: OrmUserRepository = new OrmUserRepository(
    this.userMapper,
    PgDatabaseSingleton.getInstance(),
  );
  private transactionHandler = new TransactionHandler(
    PgDatabaseSingleton.getInstance().createQueryRunner(),
  );

  constructor(
    ormTrainerMapper: IMapper<Trainer, OrmTrainerEntity>,
    dataSource: DataSource,
  ) {
    super(OrmTrainerEntity, dataSource.manager);
    this.ormTrainerMapper = ormTrainerMapper;
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
        new Error('Trainer not found')
      );
    }

    const trainerDomain = await this.ormTrainerMapper.toDomain(trainer);
    const oneTrainer = Result.success<Trainer>(trainerDomain);
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

      if (!user.isSuccess) return Result.fail(new Error('User not found'));

      const OrmTrainerEntity = await this.ormTrainerMapper.toPersistence(trainer.Value);

      const ormUser = await this.userMapper.toPersistence(user.Value);

      const trainersWithUsers = await this.find({
        where: {
          id: OrmTrainerEntity.id,
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
          new Error('User already follow this trainer')
        );
      }
      let array = [];
      for (let x = 0; x < trainersWithUsers[0].users.length; x++) {
        array.push(trainersWithUsers[0].users[x]);
      }
      array.push(ormUser);
      OrmTrainerEntity.users = array;
      await this.save(OrmTrainerEntity);
      return Result.success<Trainer>(trainer.Value);
      
    } catch (err) {
      return Result.fail<Trainer>(
        new Error(err.message)
      );
    }
  }

  /*async findAllTrainers(): Promise<Result<Trainer[]>> {
    const trainer = await this.find();
    if (!trainer)
      return Result.fail<Trainer[]>(
        new Error('Trainers not founds'),
        404,
        'Trainers not founds',
      );
    const trainerDomain = await this.ormTrainerMapper.arrayToDomain(trainer);

    return Result.success<Trainer[]>(trainerDomain, 200);
  }

  async updateTrainer(
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
      const ormUser = await this.ormTrainerMapper.toPersistence(trainer);
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
}
