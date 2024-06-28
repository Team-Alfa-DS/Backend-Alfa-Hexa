import { OrmLessonEntity } from "src/course/infraestructure/entities/orm-entities/orm-lesson.entity";
import { OrmUserEntity } from "src/user/infraestructure/entities/orm-entities/orm-user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('progress')
export class OrmProgressEntity {

    @PrimaryColumn({type: 'uuid'})
    lesson_id: string;

    @PrimaryColumn({type: 'uuid'})
    user_id: string;

    @Column()
    markAsCompleted: boolean;

    @Column({type: 'int'})
    time: number;

    @Column('timestamptz', {default: () => "CURRENT_TIMESTAMP"})
    lastTime: Date;

    @ManyToOne(() => OrmLessonEntity, lesson => lesson.progress)
    @JoinColumn({name: 'lesson_id'})
    lesson: OrmLessonEntity;

    @ManyToOne(() => OrmUserEntity, user => user.progress)
    @JoinColumn({name: 'user_id'})
    user: OrmUserEntity;

    static create (
        lesson_id: string,
        user_id: string,
        markAsCompleted: boolean,
        time?: number,
        lastTime?: Date
    ) {
        const progress = new OrmProgressEntity()
        progress.lesson_id = lesson_id;
        progress.user_id = user_id;
        progress.markAsCompleted = markAsCompleted;
        progress.time = time;
        progress.lastTime = lastTime;
        return progress;
    }
}