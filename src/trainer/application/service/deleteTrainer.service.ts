import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { Trainer } from 'src/trainer/domain/trainer';
import { IApplicationService } from '../application-service/application-service.interface';

export class DeleteTrainerService implements IApplicationService<Trainer, any> {
  constructor(private readonly trainerRepository: ITrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: Trainer): Promise<Result<any>> {
    const deleted = await this.trainerRepository.deleteTrainer(data);
    if (!deleted.isSuccess) {
      return Result.fail(
        new Error('Error saving deleted'),
        404,
        'Error saving deleted',
      );
    }
    return Result.success(deleted, 202);
  }

  get name(): string {
    return this.constructor.name;
  }
}
