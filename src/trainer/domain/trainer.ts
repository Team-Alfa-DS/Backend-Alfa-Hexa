import { AggregateRoot } from 'src/common/domain/aggregate-root';
import { TrainerFollower } from './valueObjects/trainer-followers';
import { TrainerId } from './valueObjects/trainer-id';
import { TrainerLocation } from './valueObjects/trainer-location';
import { TrainerName } from './valueObjects/trainer-name';
import { TrainerUserFollow } from './valueObjects/trainer-userFollow';
import { DomainEvent } from 'src/common/domain/domain-event';
import { TrainerCreated } from './events/trainer-created.events';
import { InvalidTrainerException } from './exceptions/Invalid-trainer-exception';

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
    const Trainercreated = TrainerCreated.create(id, name, followers, userFollow, location);
    super(id, Trainercreated)
  
  }

  protected when(event: DomainEvent): void {
    if(event instanceof TrainerCreated){
      this.name = event.name;
      this.followers = event.followers;
      this.userFollow = event.userfollow;
      this.location = event.trainerlocation;
    }
  }

  protected validateState(): void {
    if(!this.name || !this.followers || !this.userFollow || !this.location){
      throw new InvalidTrainerException('Entrenador no valido');   
    }
    
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
