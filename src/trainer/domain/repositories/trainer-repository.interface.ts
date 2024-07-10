import { Result } from 'src/common/domain/result-handler/result';
import { Trainer } from '../trainer';
import { TrainerId } from '../valueObjects/trainer-id';
import { UserId } from 'src/user/domain/value-objects/user-id';
import { TrainerFollowerUserId } from '../valueObjects/trainer-userid';

export interface ITrainerRepository {
  findTrainerById(id: TrainerId): Promise<Result<Trainer>>;
  followTrainer(trainer: Trainer, user: TrainerFollowerUserId): Promise<void>;
  unFollowTrainer(trainer: Trainer, user: TrainerFollowerUserId): Promise<void>;
  findAllTrainers(userfollow?: boolean ,user?: string, page?: number, perpage?: number, ): Promise<Result<Trainer[]>>;
  countnotreaded(): Promise<Result<number>>;
}
