// import { Result } from 'src/common/domain/result-handler/result';
// import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
// import { Trainer } from 'src/trainer/domain/trainer';
// import { IApplicationService } from '../application-service/application-service.interface';

// export class FindAllTrainersService
//   implements IApplicationService<Trainer, any>
// {
//   constructor(private readonly trainerRepository: ITrainerRepository) {
//     this.trainerRepository = trainerRepository;
//   }

//   async execute(): Promise<Result<any>> {
//     const trainers = await this.trainerRepository.findAllTrainers();
//     if (!trainers.isSuccess) {
//       return Result.fail(
//         new Error('Error trainers not found'),
//         404,
//         'Error trainers not found',
//       );
//     }
//     return Result.success(trainers, 202);
//   }

//   get name(): string {
//     return this.constructor.name;
//   }
// }
