import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IService } from 'src/common/application/interfaces/IService';
import { FindOneTrainerRequest } from '../dto/request/find-one-trainer.request';
import { FindOneTrainerResponse } from '../dto/response/find-one-trainer.response';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';
import { UserId } from 'src/user/domain/value-objects/user-id';
import { IOdmTrainerRepository } from 'src/trainer/domain/repositories/odm-trainer-repository.interface';

export class FindOneTrainerService extends IService<FindOneTrainerRequest, FindOneTrainerResponse> {
  constructor(private readonly trainerRepository: IOdmTrainerRepository) {
    super();
    this.trainerRepository = trainerRepository;
  }

  async execute(data: FindOneTrainerRequest): Promise<Result<FindOneTrainerResponse>> {
    let trainerId = TrainerId.create(data.id);
    
    const trainer = await this.trainerRepository.findTrainerById(trainerId);

    if (!trainer.isSuccess) {
      return Result.fail(
        new Error('Trainer not found')
      );
    }
    let userFollow = false;
    if (trainer.Value.User.find(u => u.trainerFollowerUserId.equals(UserId.create(data.userId)))){
      userFollow = true;
    }
    const response = new FindOneTrainerResponse(trainer.Value.Id.trainerId, trainer.Value.Name.trainerName, trainer.Value.Followers.trainerFollower, userFollow, trainer.Value.Location.trainerLocation);
    return Result.success(response);
  }
}
