import { AggregateRoot } from 'src/common/domain/aggregate-root';
import { TrainerFollower } from './valueObjects/trainer-followers';
import { TrainerId } from './valueObjects/trainer-id';
import { TrainerLocation } from './valueObjects/trainer-location';
import { TrainerName } from './valueObjects/trainer-name';
import { DomainEvent } from 'src/common/domain/domain-event';
import { TrainerCreated } from './events/trainer-created.events';
import { InvalidTrainerException } from './exceptions/Invalid-trainer-exception';
import { TrainerFollowerUserId } from './valueObjects/trainer-userid';
import { TrainerBlogId } from './valueObjects/trainer-blogid';
import { TrainerCourseId } from './valueObjects/trainer-courseid';
import { TrainerUsersUpdated } from './events/trainer-users-updated.event';
import { TrainerRegister } from './events/trainer-Register.event';

export class Trainer extends AggregateRoot<TrainerId> {
  private name: TrainerName;
  private followers: TrainerFollower;
  private location: TrainerLocation;
  private courses: TrainerCourseId[];
  private blogs: TrainerBlogId[];
  private users: TrainerFollowerUserId[];
  
  constructor(
    id: TrainerId,
    name: TrainerName,
    followers: TrainerFollower,
    location: TrainerLocation,
    courses: TrainerCourseId[],
    blogs: TrainerBlogId[],
    users: TrainerFollowerUserId[],
  ) {
    const Trainercreated = TrainerCreated.create(id, name, followers, location, courses, blogs, users);
    super(id, Trainercreated)
  
  }

  protected when(event: DomainEvent): void {
    if(event instanceof TrainerCreated){
      this.name = event.name;
      this.followers = event.followers;
      this.location = event.trainerlocation;
      this.courses = event.courses;
      this.blogs = event.blogs;
      this.users = event.users;
    }

    if (event instanceof TrainerUsersUpdated) {
      this.users = event.users
    }
  }

  protected validateState(): void {
    if(!this.name || !this.followers || !this.location){
      throw new InvalidTrainerException('Entrenador no valido');   
    }
    
  }
  
  static create(
    id: TrainerId,
    name: TrainerName,
    followers: TrainerFollower,
    location: TrainerLocation,
    courses: TrainerCourseId[],
    blogs: TrainerBlogId[],
    users: TrainerFollowerUserId[],
  ): Trainer {
    return new Trainer(id, name, followers, location, courses, blogs, users);
  }
  
  get Name(): TrainerName {
    return this.name;
  }
  get Followers(): TrainerFollower {
    return this.followers;
  }
  get Location(): TrainerLocation {
    return this.location;
  }
  get Courses(): TrainerCourseId[] {
    return this.courses;
  }
  get Blogs(): TrainerBlogId[] {
    return this.blogs;
  }
  get User(): TrainerFollowerUserId[] {
    return this.users;
  }

  AddUserFollow (user: TrainerFollowerUserId) {
    const users = this.users;
    users.push(user)
    this.apply(TrainerUsersUpdated.create(this.Id, users));
  }

  DelUserFollow (user: TrainerFollowerUserId) {
    const users = this.users.filter(u => u.trainerFollowerUserId.Id !== user.trainerFollowerUserId.Id);
    this.apply(TrainerUsersUpdated.create(this.Id, users));
  }

  Register() {
    this.apply(TrainerRegister.create(this.Id, this.name, this.followers, this.location, this.courses, this.blogs, this.users));
  }
}
