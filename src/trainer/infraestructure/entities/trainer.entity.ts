import { Blog } from 'src/blog/infraestructure/entities/blog.entity';
import { CourseEntity } from 'src/course/infraestructure/entities/course.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Blog, (blog) => blog.trainer)
  blogs: Blog[];

  @OneToMany(() => CourseEntity, (course) => course.trainer)
  courses: CourseEntity[];

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
