import { Result } from "src/common/domain/result-handler/result";
import { TrainerId } from "../valueObjects/trainer-id";
import { Trainer } from "../trainer";
import { UserId } from "src/user/domain/value-objects/user-id";

export interface IOdmTrainerRepository {
    findTrainerById(id: TrainerId): Promise<Result<Trainer>>;
    followTrainer(trainer: Trainer): Promise<void>;
    findAllTrainers(userfollow?: boolean ,user?: string, page?: number, perpage?: number, ): Promise<Result<Trainer[]>>;
    countFollows(userId: UserId): Promise<Result<number>>;
}