import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IApplicationService } from '../application-service/application-service.interface';
import { FollowTrainerDto } from '../dto/followTrainer.dto';

export class FollowTrainerService
  implements IApplicationService<FollowTrainerDto, any>
{
  /*{ idTrainer: string; idUser: string }*/
  constructor(private readonly trainerRepository: ITrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: FollowTrainerDto): Promise<Result<any>> {
    const trainer = await this.trainerRepository.followTrainer(data);
    if (!trainer.isSuccess) {
      return trainer;
    }
    return Result.success('Trainer Followed!!', 202);
  }

  get name(): string {
    return this.constructor.name;
  }
}
