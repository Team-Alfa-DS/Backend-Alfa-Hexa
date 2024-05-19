import { Lesson } from "src/course/infraestructure/entities/lesson.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('progress')
export class Progress {
    @PrimaryColumn({type: 'uuid'})
    lesson_id: string;

    @PrimaryColumn({type: 'uuid'})
    user_id: string;

    @Column()
    markAsCompleted: boolean;

    @Column({nullable: true})
    time: number;

    @ManyToOne(() => Lesson, lesson => lesson.progress)
    @JoinColumn({name: 'lesson_id'})
    lesson: Lesson;

    @ManyToOne(() => User, user => user.progress)
    @JoinColumn({name: 'user_id'})
    user: User;

}