import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IService } from 'src/common/application/interfaces/IService';
import { FollowTrainerRequest } from '../dto/request/follow-trainer.request';
import { FollowTrainerResponse } from '../dto/response/follow-trainer.response';

export class FollowTrainerService extends IService<FollowTrainerRequest, FollowTrainerResponse>
{
  constructor(private readonly trainerRepository: ITrainerRepository) {
    super();
    this.trainerRepository = trainerRepository;
  }

  async execute(data: FollowTrainerRequest): Promise<Result<FollowTrainerResponse>> {
    const trainer = await this.trainerRepository.followTrainer(data);
    if (!trainer.isSuccess) {
      return Result.fail(trainer.Error, trainer.StatusCode, trainer.Message);
    }
    const response = new FollowTrainerResponse()
    return Result.success(response, 202);
  }
}
