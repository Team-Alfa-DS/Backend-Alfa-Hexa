
import { OrmCategoryEntity } from "src/category/infraestructure/entities/orm-entities/orm-category.entity";
import { OrmTrainerEntity } from "src/trainer/infraestructure/entities/orm-entities/orm-trainer.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrmLessonEntity } from "./orm-lesson.entity";
import { OrmTagEntity } from "src/tag/infraestructure/entities/orm-entities/orm-tag.entity";

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

  @ManyToOne(() => OrmCategoryEntity, category => category.blogs)
  @JoinColumn({name: 'category_id'})
  category: OrmCategoryEntity;

  @ManyToOne(() => OrmTrainerEntity, (trainer) => trainer.blogs)
  @JoinColumn({ name: 'trainer_id' })
  trainer: OrmTrainerEntity;

  @ManyToMany(() => OrmTagEntity, (tag) => tag.courses)
  @JoinTable({ name: 'course_tag' })
  tags: OrmTagEntity[];
}
