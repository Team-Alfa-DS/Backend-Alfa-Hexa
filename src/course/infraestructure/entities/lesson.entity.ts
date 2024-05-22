import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "./course.entity";
import { Progress } from "src/user/infraestructure/entities/progress.entity";

@Entity('lesson')
export class LessonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({nullable: true})
    video: string;

    @Column({nullable: true})
    image: string;

    @ManyToOne(() => CourseEntity, course => course.lessons)
    @JoinColumn({name: 'course_id'})
    course: CourseEntity;

    @OneToMany(() => Progress, progress => progress.lesson)
    progress: Progress[];

}