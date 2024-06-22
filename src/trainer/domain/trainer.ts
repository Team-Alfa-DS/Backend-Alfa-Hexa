import { AggregateRoot } from 'src/common/domain/aggregate-root';
import { TrainerFollower } from './valueObjects/trainer-followers';
import { TrainerId } from './valueObjects/trainer-id';
import { TrainerLocation } from './valueObjects/trainer-location';
import { TrainerName } from './valueObjects/trainer-name';
import { TrainerUserFollow } from './valueObjects/trainer-userFollow';
import { DomainEvent } from 'src/common/domain/domain-event';

export class Trainer extends AggregateRoot<TrainerId> {
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
  
  protected when(event: DomainEvent): void {
    throw new Error('Method not implemented.');
  }
  protected validateState(): void {
    throw new Error('Method not implemented.');
  }
}
