import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity('lesson')
export class Lesson {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({nullable: true})
    video: Date;

    @Column({nullable: true})
    image: string;

    @ManyToOne(() => Course, course => course.lessons)
    @JoinColumn({name: 'course_id'})
    course: Course;

}