
import { OrmCategoryEntity } from "src/category/infraestructure/entities/orm-entities/orm-category.entity";
import { OrmTrainerEntity } from "src/trainer/infraestructure/entities/orm-entities/orm-trainer.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrmLessonEntity } from "./orm-lesson.entity";
import { OrmTagEntity } from "src/tag/infraestructure/entities/orm-entities/orm-tag.entity";
import { Lesson } from "src/course/domain/entities/Lesson";

@Entity('course')
export class OrmCourseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  publication_date: Date;

  @Column()
  minutes: number;

  @Column()
  weeks: number;

  @Column({ nullable: true })
  level: string;

  @Column()
  image: string;

  @OneToMany(() => OrmLessonEntity, (lesson) => lesson.course)
  lessons: OrmLessonEntity[];

  @Column({ type: 'uuid'})
  category_id: string;

  @ManyToOne(() => OrmCategoryEntity, category => category.blogs)
  @JoinColumn({name: 'category_id'})
  category: OrmCategoryEntity;

  @Column({ type: "uuid"})
  trainer_id: string;

  @ManyToOne(() => OrmTrainerEntity, (trainer) => trainer.blogs)
  @JoinColumn({ name: 'trainer_id' })
  trainer: OrmTrainerEntity;

  @ManyToMany(() => OrmTagEntity, (tag) => tag.courses)
  @JoinTable({ name: 'course_tag' })
  tags: OrmTagEntity[];

  static create(
    id: string,
    name: string,
    description: string,
    publication_date: Date,
    minutes: number,
    weeks: number,
    level: string,
    image: string,
    category_id: string,
    trainer_id: string
  ): OrmCourseEntity {
    const ormCourse = new OrmCourseEntity();
    ormCourse.id = id;
    ormCourse.name = name;
    ormCourse.description = description;
    ormCourse.publication_date = publication_date;
    ormCourse.minutes = minutes;
    ormCourse.weeks = weeks;
    ormCourse.level = level;
    ormCourse.image = image;
    ormCourse.category_id = category_id;
    ormCourse.trainer_id = trainer_id;

    return ormCourse;
  }


}
