import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IService } from 'src/common/application/interfaces/IService';
import { FindOneTrainerRequest } from '../dto/request/find-one-trainer.request';
import { FindOneTrainerResponse } from '../dto/response/find-one-trainer.response';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';

export class FindOneTrainerService extends IService<FindOneTrainerRequest, FindOneTrainerResponse> {
  constructor(private readonly trainerRepository: ITrainerRepository) {
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

    const response = new FindOneTrainerResponse(trainer.Value);
    return Result.success(response);
  }
}
