import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IApplicationService } from '../application-service/application-service.interface';

export class FollowTrainerService
  implements IApplicationService<{ idTrainer: string; idUser: string }, any>
{
  constructor(private readonly trainerRepository: ITrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: {
    idTrainer: string;
    idUser: string;
  }): Promise<Result<any>> {
    const trainer = await this.trainerRepository.followTrainer(data);
    if (!trainer.isSuccess) {
      return Result.fail(
        new Error('Error trainer not found'),
        404,
        'Error trainer not found',
      );
    }
    return Result.success(trainer, 202);
  }

  get name(): string {
    return this.constructor.name;
  }
}
