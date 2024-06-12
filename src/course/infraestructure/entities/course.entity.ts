import { Tag } from "src/blog/infraestructure/entities/tag.entity";
import { Category } from "src/category/infraestructure/entities/category.entity";
import { Trainer } from "src/trainer/infraestructure/entities/trainer.entity";
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

    @OneToMany(() => LessonEntity, lesson => lesson.course)
    lessons: LessonEntity[];

    @ManyToOne(() => Category, category => category.blogs)
    @JoinColumn({name: 'category_id'})
    category: Category;

    @ManyToOne(() => Trainer, trainer => trainer.blogs)
    @JoinColumn({name: 'trainer_id'})
    trainer: Trainer;

    @ManyToMany(() => Tag, tag => tag.courses)
    @JoinTable({name: 'course_tag'})
    tags: Tag[];
}