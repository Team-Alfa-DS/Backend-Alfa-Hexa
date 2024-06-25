import { IMapper } from 'src/common/application/mappers/mapper.interface';
import { OrmTrainer } from '../entities/trainer.entity';
import { Trainer } from '../../domain/trainer';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';
import { TrainerName } from 'src/trainer/domain/valueObjects/trainer-name';
import { TrainerFollower } from 'src/trainer/domain/valueObjects/trainer-followers';
import { TrainerUserFollow } from 'src/trainer/domain/valueObjects/trainer-userFollow';
import { TrainerLocation } from 'src/trainer/domain/valueObjects/trainer-location';

export class OrmTrainerMapper implements IMapper<Trainer, OrmTrainer> {
  async toOrm(domainEntity: Trainer): Promise<OrmTrainer> {
    //Optional?
    if (domainEntity) {
      const ormTrainer = OrmTrainer.create(
        domainEntity.Id.trainerId,
        domainEntity.Name.trainerName,
        domainEntity.Followers.trainerFollower,
        domainEntity.UserFollow.trainerUserFollow,
        domainEntity.Location.trainerLocation,
      );
      return ormTrainer;
    }
    return null;
  }

  async toDomain(ormEntity: OrmTrainer): Promise<Trainer> {
    if (ormEntity) {
      const trainer = Trainer.create(
        TrainerId.create(ormEntity.id),
        TrainerName.create(ormEntity.name),
        TrainerFollower.create(ormEntity.followers),
        TrainerUserFollow.create(ormEntity.userFollow),
        TrainerLocation.create(ormEntity.location),
      );
      return trainer;
    }
    return null;
  }

  /*async arrayToDomain(entities: OrmTrainer[]): Promise<Trainer[]> {
    const courses: Trainer[] = [];
    for (let entity of entities) {
      courses.push(await this.toDomain(entity));
    }
    return courses;
  }*/
}
