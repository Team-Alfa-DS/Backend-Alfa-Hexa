import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IService } from 'src/common/application/interfaces/IService';
import { FollowTrainerRequest } from '../dto/request/follow-trainer.request';
import { FollowTrainerResponse } from '../dto/response/follow-trainer.response';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';
import { UserId } from 'src/user/domain/value-objects/user-id';

export class FollowTrainerService extends IService<FollowTrainerRequest, FollowTrainerResponse>
{
  /*{ idTrainer: string; idUser: string }*/
  constructor(private readonly trainerRepository: ITrainerRepository) {
    super();
    this.trainerRepository = trainerRepository;
  }

  async execute(data: FollowTrainerRequest): Promise<Result<FollowTrainerResponse>> {
    let trainerId = TrainerId.create(data.idTrainer);
    let userId = UserId.create(data.idUser);

    const trainer = await this.trainerRepository.followTrainer( trainerId, userId );

    if (!trainer.isSuccess) {
      return Result.fail(trainer.Error);
    }

    const response = new FollowTrainerResponse()
    return Result.success(response);
  }
}
