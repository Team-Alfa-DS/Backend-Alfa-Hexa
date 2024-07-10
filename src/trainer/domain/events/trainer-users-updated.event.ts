import { DomainEvent } from "src/common/domain/domain-event";
import { TrainerId } from "../valueObjects/trainer-id";
import { TrainerFollowerUserId } from "../valueObjects/trainer-userid";

export class TrainerUsersUpdated extends DomainEvent {

    private constructor(
        public id: TrainerId,
        public users: TrainerFollowerUserId[]
    ) {
        super()
    }

    static create(id: TrainerId, users: TrainerFollowerUserId[]) {
        return new TrainerUsersUpdated(id, users);
    }
}