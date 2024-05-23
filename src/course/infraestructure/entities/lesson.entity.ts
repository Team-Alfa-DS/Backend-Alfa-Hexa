import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { ProgressEntity } from "src/user/infraestructure/entities/progress.entity";

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

    @OneToMany(() => ProgressEntity, progress => progress.lesson)
    progress: ProgressEntity[];

}