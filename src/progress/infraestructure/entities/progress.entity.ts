import { LessonEntity } from "src/course/infraestructure/entities/lesson.entity";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('progress')
export class ProgressEntity {
    @PrimaryColumn({type: 'uuid'})
    lesson_id: string;

    @PrimaryColumn({type: 'uuid'})
    user_id: string;

    @Column()
    markAsCompleted: boolean;

    @Column({nullable: true})
    time: number;

    @Column('timestamptz', {default: () => "CURRENT_TIMESTAMP"})
    lastTime: Date;

    @ManyToOne(() => LessonEntity, lesson => lesson.progress)
    @JoinColumn({name: 'lesson_id'})
    lesson: LessonEntity;

    @ManyToOne(() => UserEntity, user => user.progress)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    static create (
        lesson_id: string,
        user_id: string,
        markAsCompleted: boolean,
        time?: number,
        lastTime?: Date
    ) {
        const progress = new ProgressEntity()
        progress.lesson_id = lesson_id;
        progress.user_id = user_id;
        progress.markAsCompleted = markAsCompleted;
        progress.time = time;
        progress.lastTime = lastTime;
        return progress;
    }
}