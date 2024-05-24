import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { Trainer } from 'src/trainer/domain/trainer';
import { IApplicationService } from '../application-service/application-service.interface';
import { CreateTrainerDto } from '../dto/createTrainer.dto';

export class CreateTrainerService
  implements IApplicationService<CreateTrainerDto, any>
{
  constructor(private readonly trainerRepository: ITrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: CreateTrainerDto): Promise<Result<any>> {
    const trainer = new Trainer(
      data.Id,
      data.name,
      data.followers,
      data.userFollow,
      data.location,
    );
    const saved = await this.trainerRepository.saveTrainer(trainer);
    if (!saved.isSuccess) {
      return Result.fail(
        new Error('Error saving trainer'),
        404,
        'Error saving trainer',
      );
    }
    return Result.success(saved, 202);
  }

  get name(): string {
    return this.constructor.name;
  }
}
