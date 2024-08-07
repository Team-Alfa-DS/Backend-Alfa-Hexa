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
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';
import { TrainerFollowerUserId } from 'src/trainer/domain/valueObjects/trainer-userid';
import { TrainerNotFoundException } from 'src/trainer/domain/exceptions/trainer-not-found-exception';

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
        new TrainerNotFoundException('Trainer not found')
      );
    }

    const trainerDomain = await this.ormTrainerMapper.toDomain(trainer);
    const oneTrainer = Result.success<Trainer>(trainerDomain);
    return oneTrainer;
  }

  async followTrainer(trainer: Trainer, user: TrainerFollowerUserId): Promise<void> {
    const OrmTrainerEntity = await this.ormTrainerMapper.toPersistence(trainer);
    const followers = (await this.findOne({relations: {users: true}, where: {id: OrmTrainerEntity.id}})).users;
    const userOrm = await this.userRepository.findOneBy({id: user.trainerFollowerUserId.Id})
    followers.push(userOrm);
    OrmTrainerEntity.users = followers;
    await this.save(OrmTrainerEntity);
  }

  async unFollowTrainer(trainer: Trainer, user: TrainerFollowerUserId): Promise<void> {
    const OrmTrainerEntity = await this.ormTrainerMapper.toPersistence(trainer);
    let followers = (await this.findOne({relations: {users: true}, where: {id: OrmTrainerEntity.id}})).users;
    const userOrm = await this.userRepository.findOneBy({id: user.trainerFollowerUserId.Id})
    followers = followers.filter(u => u.id !== user.trainerFollowerUserId.Id);
    OrmTrainerEntity.users = followers;
    await this.save(OrmTrainerEntity);
  }

  async findAllTrainers(userFollow?: boolean, user?: string, page?: number, perpage?: number, ): Promise<Result<Trainer[]>> {
    let queryBuilder = this.createQueryBuilder("trainer")
      //.leftJoinAndSelect("trainer.courses", "courses")
      //.leftJoinAndSelect("trainer.blogs", "blogs")
      .leftJoinAndSelect("trainer.users", "users");
  
    if (userFollow === true) {
      queryBuilder = queryBuilder.where("trainer.userFollow = 1", {userfollow: 1})

    }
    if(userFollow === false){
      queryBuilder = queryBuilder.where("trainer.userFollow = 0", {userfollow: 0})
    }

    let trainers = await queryBuilder.getMany();
  
    if (perpage) {
      if (!page) { page = 0; }
      trainers = trainers.slice((page * perpage), ((page + perpage) * perpage));
    }
    const trainerDomains: Trainer[] = [];

    for (const trainer of trainers) {
      trainerDomains.push(await this.ormTrainerMapper.toDomain(trainer))
    }
    return Result.success<Trainer[]>(trainerDomains);
  }

  async countnotreaded(): Promise<Result<number>> {
    let count = await this.createQueryBuilder("trainer")
      .where("trainer.userFollow = 0")
      .getCount();
    return Result.success<number>(count);
   
  }

  async saveTrainer(trainer: Trainer): Promise<void> {
    const trainerPers = await this.ormTrainerMapper.toPersistence(trainer);
    await this.save(trainerPers);
  }

}