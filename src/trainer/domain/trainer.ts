import { Entity } from '../../common/domain/entity';

export class Trainer extends Entity<string> {
  private name: string;
  private followers: number;
  private userFollow: boolean;
  private location: string;

  constructor(
    id: string,
    name: string,
    followers: number,
    userFollow: boolean,
    location: string,
  ) {
    super(id);
    this.name = name;
    this.followers = followers;
    this.userFollow = userFollow;
    this.location = location;
  }

  static create(
    id: string,
    name: string,
    followers: number,
    userFollow: boolean,
    location: string,
  ): Trainer {
    return new Trainer(id, name, followers, userFollow, location);
  }

  get Name(): string {
    return this.name;
  }
  get Followers(): number {
    return this.followers;
  }
  get UserFollow(): boolean {
    return this.userFollow;
  }
  get Location(): string {
    return this.location;
  }

  updateName(name: string) {
    this.name = name;
  }

  updateFollowers(followers: number) {
    this.followers = followers;
  }

  updateUserFollow(userFollow: boolean) {
    this.userFollow = userFollow;
  }

  updateLocation(location: string) {
    this.location = location;
  }
}
