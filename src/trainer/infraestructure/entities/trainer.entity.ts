import { BlogEntity } from "src/blog/infraestructure/entities/blog.entity";
import { CourseEntity } from "src/course/infraestructure/entities/course.entity";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('trainer')
export class OrmTrainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  followers: number;

  @Column()
  userFollow: boolean;

  @Column()
  location: string;

    @OneToMany(() => BlogEntity, blog => blog.trainer)
    blogs: BlogEntity[];

  @OneToMany(() => CourseEntity, (course) => course.trainer)
  courses: CourseEntity[];

  @ManyToMany(() => UserEntity, (UserEntity) => UserEntity.trainers, {
    cascade: true,
  })
  @JoinTable()
  users: UserEntity[];

  static create(
    id: string,
    name: string,
    followers: number,
    userFollow: boolean,
    location: string,
  ): OrmTrainer {
    const trainer = new OrmTrainer();
    trainer.id = id;
    trainer.name = name;
    trainer.followers = followers;
    trainer.userFollow = userFollow;
    trainer.location = location;
    return trainer;
  }
}
