import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { IService } from 'src/common/application/interfaces/IService';
import { FollowTrainerRequest } from '../dto/request/follow-trainer.request';
import { FollowTrainerResponse } from '../dto/response/follow-trainer.response';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';
import { UserId } from 'src/user/domain/value-objects/user-id';
import { IOdmTrainerRepository } from 'src/trainer/domain/repositories/odm-trainer-repository.interface';
import { TrainerFollowerUserId } from 'src/trainer/domain/valueObjects/trainer-userid';
import { IEventPublisher } from 'src/common/application/events/event-publisher.abstract';
import { TrainerNotFoundException } from 'src/trainer/domain/exceptions/trainer-not-found-exception';

export class FollowTrainerService extends IService<FollowTrainerRequest, FollowTrainerResponse>
{
  /*{ idTrainer: string; idUser: string }*/
  constructor(private readonly trainerRepository: ITrainerRepository, private readonly odmTrainerRepository: IOdmTrainerRepository, private readonly eventPublisher: IEventPublisher) {
    super();
    this.trainerRepository = trainerRepository;
    this.odmTrainerRepository = odmTrainerRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(data: FollowTrainerRequest): Promise<Result<FollowTrainerResponse>> {
    let trainerId = TrainerId.create(data.idTrainer);
    let userId = UserId.create(data.idUser);
    const trainer = await this.odmTrainerRepository.findTrainerById(trainerId);

    if (!trainer.isSuccess) return Result.fail(new TrainerNotFoundException('No se encontro al trainer'));
    const trainerDomain = trainer.Value;
    const follower = await this.odmTrainerRepository.findFollowByUserId(trainerId, TrainerFollowerUserId.create(userId));
    if (follower) {
      trainerDomain.DelUserFollow(TrainerFollowerUserId.create(userId))
      await this.trainerRepository.unFollowTrainer( trainerDomain, TrainerFollowerUserId.create(userId) );
    }
    else {
      trainerDomain.AddUserFollow(TrainerFollowerUserId.create(userId));
      await this.trainerRepository.followTrainer( trainerDomain, TrainerFollowerUserId.create(userId) );
    }

    this.eventPublisher.publish(trainerDomain.pullDomainEvents());
    const response = new FollowTrainerResponse()
    return Result.success(response);
  }
}
