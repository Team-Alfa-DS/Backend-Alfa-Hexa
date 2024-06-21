import { Entity } from '../../common/domain/entity';
import { TrainerFollower } from './valueObjects/trainer-followers';
import { TrainerId } from './valueObjects/trainer-id';
import { TrainerLocation } from './valueObjects/trainer-location';
import { TrainerName } from './valueObjects/trainer-name';
import { TrainerUserFollow } from './valueObjects/trainer-userFollow';

export class Trainer extends Entity<TrainerId> {
  private name: TrainerName;
  private followers: TrainerFollower;
  private userFollow: TrainerUserFollow;
  private location: TrainerLocation;

  constructor(
    id: TrainerId,
    name: TrainerName,
    followers: TrainerFollower,
    userFollow: TrainerUserFollow,
    location: TrainerLocation,
  ) {
    super(id);
    this.name = name;
    this.followers = followers;
    this.userFollow = userFollow;
    this.location = location;
  }

  static create(
    id: TrainerId,
    name: TrainerName,
    followers: TrainerFollower,
    userFollow: TrainerUserFollow,
    location: TrainerLocation,
  ): Trainer {
    return new Trainer(id, name, followers, userFollow, location);
  }

  get Name(): TrainerName {
    return this.name;
  }
  get Followers(): TrainerFollower {
    return this.followers;
  }
  get UserFollow(): TrainerUserFollow {
    return this.userFollow;
  }
  get Location(): TrainerLocation {
    return this.location;
  }

}
