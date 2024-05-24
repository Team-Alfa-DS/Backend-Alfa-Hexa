import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
//import { Trainer } from 'src/trainer/domain/trainer';
import { IApplicationService } from '../application-service/application-service.interface';
import { UpdateTrainerDto } from '../dto/updateTrainer.dto';

export class UpdateTrainerService
  implements IApplicationService<UpdateTrainerDto, any>
{
  constructor(private readonly trainerRepository: ITrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: UpdateTrainerDto): Promise<Result<any>> {
    const trainer = await this.trainerRepository.findTrainerById(data.Id);
    if (!trainer.isSuccess) {
      return Result.fail(
        new Error('Trainer not found'),
        404,
        'Trainer not found',
      );
    }

    const newTrainer = trainer.Value;
    if (data.Name) newTrainer.updateName(data.Name);
    if (data.Followers) newTrainer.updateFollowers(data.Followers);
    if (data.UserFollow) newTrainer.updateUserFollow(data.UserFollow);
    if (data.Location) newTrainer.updateLocation(data.Location);

    /*const updateTrainer = await this.trainerRepository.updateTrainer(
      trainer.Value.Id,
      newTrainer,
    );*/
  }

  get name(): string {
    return this.constructor.name;
  }
}
