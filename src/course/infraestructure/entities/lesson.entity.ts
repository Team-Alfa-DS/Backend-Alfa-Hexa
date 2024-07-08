import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "./course.entity";
import { ProgressEntity } from "src/progress/infraestructure/entities/progress.entity";
import { LessonCommentEntity } from "src/comment/infraestructure/entities/lesson/comment.lesson.entity";

@Entity('lesson')
export class LessonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    seconds: number;

    @Column({nullable: true})
    video: string;

    @Column({nullable: true})
    image: string;

    @ManyToOne(() => CourseEntity, course => course.lessons, {eager: true})
    @JoinColumn({name: 'course_id'})
    course: CourseEntity;

    @OneToMany(() => ProgressEntity, progress => progress.lesson)
    progress: ProgressEntity[];

    @OneToMany(() => LessonCommentEntity, comment => comment.lesson)
    comments: LessonCommentEntity[];

}