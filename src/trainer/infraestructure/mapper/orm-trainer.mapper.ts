import { IMapper } from 'src/common/application/mappers/mapper.interface';
import { OrmTrainer } from '../entities/trainer.entity';
import { Trainer } from '../../domain/trainer';

export class OrmTrainerMapper implements IMapper<Trainer, OrmTrainer> {
  async toOrm(domainEntity: Trainer): Promise<OrmTrainer> {
    //Optional?
    if (domainEntity) {
      const ormTrainer = OrmTrainer.create(
        domainEntity.Id,
        domainEntity.Name,
        domainEntity.Followers,
        domainEntity.UserFollow,
        domainEntity.Location,
      );
      return ormTrainer;
    }
    return null;
  }

  async toDomain(ormEntity: OrmTrainer): Promise<Trainer> {
    if (ormEntity) {
      const trainer = Trainer.create(
        ormEntity.id,
        ormEntity.name,
        ormEntity.followers,
        ormEntity.userFollow,
        ormEntity.location,
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
