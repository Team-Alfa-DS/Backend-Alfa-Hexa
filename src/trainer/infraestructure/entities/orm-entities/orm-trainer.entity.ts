import { OrmBlogEntity } from "src/blog/infraestructure/entities/orm-entities/orm-blog.entity";
import { OrmCourseEntity } from "src/course/infraestructure/entities/orm-entities/orm-course.entity";
import { OrmUserEntity } from "src/user/infraestructure/entities/orm-entities/orm-user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('trainer')
export class OrmTrainerEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  followers?: number;

  @Column()
  location?: string;

  @OneToMany(() => OrmBlogEntity, (blog) => blog.trainer)
  blogs: OrmBlogEntity[];

  @OneToMany(() => OrmCourseEntity, (course) => course.trainer)
  courses?: OrmCourseEntity[];

  @ManyToMany(() => OrmUserEntity, (OrmUserEntity) => OrmUserEntity.trainers, {
    cascade: true,
  })
  @JoinTable()
  users?: OrmUserEntity[];

  static create(
    id: string,
    name: string,
    followers: number,
    location: string,
  ): OrmTrainerEntity {
    const trainer = new OrmTrainerEntity();
    trainer.id = id;
    trainer.name = name;
    trainer.followers = followers;
    trainer.location = location;
    return trainer;
  }
}
