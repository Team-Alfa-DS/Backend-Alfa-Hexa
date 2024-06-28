import { IMapper } from 'src/common/application/mappers/mapper.interface';
import { OrmTrainerEntity } from '../entities/orm-entities/orm-trainer.entity';
import { Trainer } from '../../domain/trainer';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';
import { TrainerName } from 'src/trainer/domain/valueObjects/trainer-name';
import { TrainerFollower } from 'src/trainer/domain/valueObjects/trainer-followers';
import { TrainerUserFollow } from 'src/trainer/domain/valueObjects/trainer-userFollow';
import { TrainerLocation } from 'src/trainer/domain/valueObjects/trainer-location';
import { TrainerCourseId } from 'src/trainer/domain/valueObjects/trainer-courseid';
import { TrainerBlogId } from 'src/trainer/domain/valueObjects/trainer-blogid';
import { TrainerFollowerUserId } from 'src/trainer/domain/valueObjects/trainer-userid';
import { CourseId } from 'src/course/domain/value-objects/course-id';
import { BlogId } from 'src/blog/domain/valueObjects/blogId';
import { UserId } from 'src/user/domain/value-objects/user-id';

export class OrmTrainerMapper implements IMapper<Trainer, OrmTrainerEntity> {
  async toOrm(domainEntity: Trainer): Promise<OrmTrainerEntity> {
    //Optional?
    if (domainEntity) {
      const OrmTrainer = OrmTrainerEntity.create(
        domainEntity.Id.trainerId,
        domainEntity.Name.trainerName,
        domainEntity.Followers.trainerFollower,
        domainEntity.UserFollow.trainerUserFollow,
        domainEntity.Location.trainerLocation,
      );
      return OrmTrainer;
    }
    return null;
  }

  async toDomain(ormEntity: OrmTrainerEntity): Promise<Trainer> {
    if (ormEntity) {
      
      let courses: TrainerCourseId[] = ormEntity.courses?.map(course => TrainerCourseId.create([new CourseId(course.id)])) || [];
      let blogs: TrainerBlogId[] = ormEntity.blogs?.map(blog => TrainerBlogId.create([BlogId.create(blog.id)])) || [];
      let users: TrainerFollowerUserId[] = ormEntity.users?.map(user => TrainerFollowerUserId.create([UserId.create(user.id)])) || [];
      

      const trainer = Trainer.create(
        TrainerId.create(ormEntity.id),
        TrainerName.create(ormEntity.name),
        TrainerFollower.create(ormEntity.followers),
        TrainerUserFollow.create(ormEntity.userFollow),
        TrainerLocation.create(ormEntity.location),
        courses,
        blogs,
        users,
      );
      return trainer;
    }
    return null;
  }

  /*async arrayToDomain(entities: OrmTrainerEntity[]): Promise<Trainer[]> {
    const courses: Trainer[] = [];
    for (let entity of entities) {
      courses.push(await this.toDomain(entity));
    }
    return courses;
  }*/
}
