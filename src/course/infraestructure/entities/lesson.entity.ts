import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "./course.entity";
import { ProgressEntity } from "src/user/infraestructure/entities/progress.entity";
import { CommentEntity } from "src/comment/infraestructure/entities/comment.entity";

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

    @ManyToOne(() => CourseEntity, course => course.lessons)
    @JoinColumn({name: 'course_id'})
    course: CourseEntity;

    @OneToMany(() => Progress, progress => progress.lesson)
    progress: Progress[];

    @OneToMany(() => CommentEntity, comment => comment.lesson)
    comments: CommentEntity[];

}