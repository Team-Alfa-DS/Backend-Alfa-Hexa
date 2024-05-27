import { Result } from 'src/common/domain/result-handler/result';
import { Trainer } from '../trainer';

export interface ITrainerRepository {
  findTrainerById(id: string): Promise<Result<Trainer>>;
  // findAllTrainers(): Promise<Result<Trainer[]>>;
  // updateTrainer(idTrainer: string, payload: string): Promise<Result<Trainer>>;
  // saveTrainer(trainer: Trainer): Promise<Result<Trainer>>;
  // deleteTrainer(trainer: Trainer): Promise<Result<Trainer>>;
}
