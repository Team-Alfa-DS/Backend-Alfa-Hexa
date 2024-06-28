import { Result } from 'src/common/domain/result-handler/result';
import { Trainer } from '../trainer';
import { TrainerId } from '../valueObjects/trainer-id';
import { UserId } from 'src/user/domain/value-objects/user-id';

export interface ITrainerRepository {
  findTrainerById(id: TrainerId): Promise<Result<Trainer>>;
  followTrainer(
    idTrainer: TrainerId,
    idUser: UserId
  ): Promise<Result<Trainer>>;
  // findAllTrainers(): Promise<Result<Trainer[]>>;
  // updateTrainer(idTrainer: string, payload: string): Promise<Result<Trainer>>;
  // saveTrainer(trainer: Trainer): Promise<Result<Trainer>>;
  // deleteTrainer(trainer: Trainer): Promise<Result<Trainer>>;
}
