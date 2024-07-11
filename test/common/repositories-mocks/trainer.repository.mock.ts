import { BlogId } from "../../../src/blog/domain/valueObjects/blogId";
import { Result } from "../../../src/common/domain/result-handler/result";
import { CourseId } from "../../../src/course/domain/value-objects/course-id";
import { ITrainerRepository } from "../../../src/trainer/domain/repositories/trainer-repository.interface";
import { Trainer } from "../../../src/trainer/domain/trainer";
import { TrainerBlogId } from "../../../src/trainer/domain/valueObjects/trainer-blogid";
import { TrainerCourseId } from "../../../src/trainer/domain/valueObjects/trainer-courseid";
import { TrainerFollower } from "../../../src/trainer/domain/valueObjects/trainer-followers";
import { TrainerId } from "../../../src/trainer/domain/valueObjects/trainer-id";
import { TrainerLocation } from "../../../src/trainer/domain/valueObjects/trainer-location";
import { TrainerName } from "../../../src/trainer/domain/valueObjects/trainer-name";
import { TrainerFollowerUserId } from "../../../src/trainer/domain/valueObjects/trainer-userid";
import { UserId } from "../../../src/user/domain/value-objects/user-id";

const trainers = [
    new Trainer( TrainerId.create('123e4567-e89b-12d3-a456-426614174000') , TrainerName.create('Trainer 1'), TrainerFollower.create(10),
    TrainerLocation.create('Location 1'),  [TrainerCourseId.create(new CourseId('987e6543-b21a-34c5-d678-123456789abc'))], [TrainerBlogId.create( BlogId.create('123e4567-e89b-12d3-a456-426614174000'))], 
   [ TrainerFollowerUserId.create(UserId.create('123e4567-e89b-12d3-a456-426614174000'))]),

   new Trainer( TrainerId.create('123e4567-e89b-12d3-a456-426614174001') , TrainerName.create('Trainer 2'), TrainerFollower.create(20),
   TrainerLocation.create('Location 2'),  [TrainerCourseId.create(new CourseId('987e6543-b21a-34c5-d678-123456789abd'))], [TrainerBlogId.create( BlogId.create('123e4567-e89b-12d3-a456-426614174001'))], 
   [ TrainerFollowerUserId.create(UserId.create('123e4567-e89b-12d3-a456-426614174001'))]),
]

export class TrainerMockRepository implements ITrainerRepository{
    async findTrainerById(id: TrainerId): Promise<Result<Trainer>> {
        const trainer = trainers.find(trainer => trainer.Id.equals(id));
        if(!trainer) return Result.fail(new Error('Trainer not found'));
        return Result.success(trainer);
    
    }
    saveTrainer(trainer: Trainer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    followTrainer(trainer: Trainer, user: TrainerFollowerUserId): Promise<void> {
        throw new Error("Method not implemented.");
    }
    unFollowTrainer(trainer: Trainer, user: TrainerFollowerUserId): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAllTrainers(userfollow?: boolean, user?: string, page?: number, perpage?: number): Promise<Result<Trainer[]>> {
        throw new Error("Method not implemented.");
    }
    countnotreaded(): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }
}