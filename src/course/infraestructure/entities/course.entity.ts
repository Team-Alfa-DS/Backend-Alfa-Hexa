import { Tag } from "src/blog/infraestructure/entities/tag.entity";
import { CategoryEntity } from "src/category/infraestructure/entities/category.entity";
import { OrmTrainer } from "src/trainer/infraestructure/entities/trainer.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson.entity";

@Entity('course')
export class CourseEntity {
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
  level: number;

  @Column()
  image: string;

  @OneToMany(() => LessonEntity, (lesson) => lesson.course)
  lessons: LessonEntity[];

  @ManyToOne(() => CategoryEntity, category => category.blogs)
  @JoinColumn({name: 'category_id'})
  category: CategoryEntity;

  @ManyToOne(() => OrmTrainer, (trainer) => trainer.blogs)
  @JoinColumn({ name: 'trainer_id' })
  trainer: OrmTrainer;

  @ManyToMany(() => Tag, (tag) => tag.courses)
  @JoinTable({ name: 'course_tag' })
  tags: Tag[];
}
