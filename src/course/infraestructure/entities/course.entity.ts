import { Tag } from "src/blog/infraestructure/entities/tag.entity";
import { Category } from "src/category/infraestructure/entities/category.entity";
import { Trainer } from "src/trainer/infraestructure/entities/trainer.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";

@Entity('course')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    publication_date: Date;

    @Column()
    minutes: string;

    @Column()
    weeks: string;

    @Column()
    image: string;

    @OneToMany(() => Lesson, lesson => lesson.course)
    lessons: Lesson[];

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