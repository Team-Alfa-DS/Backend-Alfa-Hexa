import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IApplicationService } from '../application-service/application-service.interface';

export class FollowTrainerService implements IApplicationService<string, any> {
  constructor(private readonly trainerRepository: ITrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: string): Promise<Result<any>> {
    const trainer = await this.trainerRepository.findTrainerById(data);
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
