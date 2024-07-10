import { Result } from "src/common/domain/result-handler/result";
import { TrainerId } from "../valueObjects/trainer-id";
import { Trainer } from "../trainer";
import { UserId } from "src/user/domain/value-objects/user-id";
import { TrainerFollowerUserId } from "../valueObjects/trainer-userid";
import { TrainerName } from "../valueObjects/trainer-name";

export interface IOdmTrainerRepository {
    findTrainerById(id: TrainerId): Promise<Result<Trainer>>;
    findTrainerByName(name: TrainerName): Promise<boolean>;
    followTrainer(trainer: Trainer): Promise<void>;
    findFollowByUserId(trainerId: TrainerId, userId: TrainerFollowerUserId): Promise<boolean>;
    findAllTrainers(userfollow?: boolean ,user?: string, page?: number, perpage?: number, ): Promise<Result<Trainer[]>>;
    countFollows(userId: UserId): Promise<Result<number>>;
    saveTrainer(trainer: Trainer): Promise<void>;
}