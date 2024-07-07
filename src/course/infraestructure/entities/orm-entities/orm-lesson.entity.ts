import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrmCourseEntity } from "./orm-course.entity";
import { OrmProgressEntity } from "src/progress/infraestructure/entities/orm-entities/orm-progress.entity";
import { OrmLessonCommentEntity } from "src/comment/infraestructure/entities/orm-entities/orm-comment.lesson.entity";

@Entity('lesson')
export class OrmLessonEntity {
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

    @ManyToOne(() => OrmCourseEntity, course => course.lessons)
    @JoinColumn({name: 'course_id'})
    course: OrmCourseEntity;

    @OneToMany(() => OrmProgressEntity, progress => progress.lesson)
    progress: OrmProgressEntity[];

    @OneToMany(() => OrmLessonCommentEntity, comment => comment.lesson)
    comments: OrmLessonCommentEntity[];

}