import { DomainEvent } from "src/common/domain/domain-event";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { TrainerName } from "src/trainer/domain/valueObjects/trainer-name";
import { TrainerFollower } from "src/trainer/domain/valueObjects/trainer-followers";
import { TrainerUserFollow } from "src/trainer/domain/valueObjects/trainer-userFollow";
import { TrainerLocation } from "src/trainer/domain/valueObjects/trainer-location";
import { TrainerCourseId } from "../valueObjects/trainer-courseid";
import { TrainerBlogId } from "../valueObjects/trainer-blogid";
import { TrainerFollowerUserId } from "../valueObjects/trainer-userid";



export class TrainerRegister extends DomainEvent{

    constructor(
        public  id: TrainerId,
        public  name: TrainerName,
        public  followers: TrainerFollower,
        public  trainerlocation: TrainerLocation,
        public  courses: TrainerCourseId[],
        public  blogs: TrainerBlogId[],
        public  users: TrainerFollowerUserId[],
    ){
        super()
    }

    static create(
        id: TrainerId,
        name: TrainerName,
        followers: TrainerFollower,
        trainerlocation: TrainerLocation,
        courses: TrainerCourseId[],
        blogs: TrainerBlogId[],
        users: TrainerFollowerUserId[],
    ): TrainerRegister {
        return new TrainerRegister(id, name, followers, trainerlocation, courses, blogs, users)
    }

}