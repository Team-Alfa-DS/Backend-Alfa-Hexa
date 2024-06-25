import { DomainEvent } from "src/common/domain/domain-event";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { TrainerName } from "src/trainer/domain/valueObjects/trainer-name";
import { TrainerFollower } from "src/trainer/domain/valueObjects/trainer-followers";
import { TrainerUserFollow } from "src/trainer/domain/valueObjects/trainer-userFollow";
import { TrainerLocation } from "src/trainer/domain/valueObjects/trainer-location";


export class TrainerCreated extends DomainEvent{

    constructor(
        public  id: TrainerId,
        public  name: TrainerName,
        public  followers: TrainerFollower,
        public  userfollow: TrainerUserFollow,
        public  trainerlocation: TrainerLocation
    ){
        super()
    }

    static create(
        id: TrainerId,
        name: TrainerName,
        followers: TrainerFollower,
        userfollow: TrainerUserFollow,
        trainerlocation: TrainerLocation
    ): TrainerCreated {
        return new TrainerCreated(id, name, followers, userfollow, trainerlocation)
    }

}