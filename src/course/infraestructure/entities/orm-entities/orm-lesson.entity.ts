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

  @Column()
  video: string;

  @Column({ type: "uuid" })
  course_id: string;

  @ManyToOne(() => OrmCourseEntity, course => course.lessons)
  @JoinColumn({name: 'course_id'})
  course: OrmCourseEntity;

  @OneToMany(() => OrmProgressEntity, progress => progress.lesson)
  progress: OrmProgressEntity[];

  @OneToMany(() => OrmLessonCommentEntity, comment => comment.lesson)
  comments: OrmLessonCommentEntity[];


  static create(
    id: string,
    title: string,
    content: string,
    seconds: number,
    video: string,
    course_id: string
  ): OrmLessonEntity {
    const ormLesson = new OrmLessonEntity();
    ormLesson.id = id;
    ormLesson.title = title;
    ormLesson.content = content;
    ormLesson.seconds = seconds;
    ormLesson.video = video;
    ormLesson.course_id = course_id;
    ormLesson.comments = []
    return ormLesson;
  }
}