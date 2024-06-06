import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IService } from 'src/common/application/interfaces/IService';
import { FollowTrainerRequest } from '../dto/request/follow-trainer.request';

export class FollowTrainerService implements IService<FollowTrainerRequest, undefined>
{
  constructor(private readonly trainerRepository: ITrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: FollowTrainerRequest): Promise<Result<undefined>> {
    const trainer = await this.trainerRepository.followTrainer(data);
    if (!trainer.isSuccess) {
      return Result.fail(trainer.Error, trainer.StatusCode, trainer.Message);
    }
    return Result.success(undefined, 202);
  }
}
