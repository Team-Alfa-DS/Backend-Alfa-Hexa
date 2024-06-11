import { Trainer } from 'src/trainer/domain/trainer';

export interface CreateTrainerDto extends Omit<Trainer, 'id'> {
  name: string;
  followers: number;
  userFollow: boolean;
  location: string;
}
