import { ApiProperty } from "@nestjs/swagger";
import { LessonEntity } from "src/course/infraestructure/entities/lesson.entity";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('progress')
export class ProgressEntity {

    @ApiProperty({
        description: 'Id de la leccion',
        example: 'asr4'
      })
    @PrimaryColumn({type: 'uuid'})
    lesson_id: string;


    @ApiProperty({
        description: 'Id del usuario',
        example: 'asrtyj543ghjklhg'
      })
    @PrimaryColumn({type: 'uuid'})
    user_id: string;


    @ApiProperty({
        description: 'Atributo para saber si completo el curso o no',
        example: 'True'
      })
    @Column()
    markAsCompleted: boolean;

    @ApiProperty({
        description: 'Tiempo que lleva',
        example: '1406'
      })
    @Column({nullable: true})
    time: number;

    @ApiProperty({
        description: 'Guardar fecha en que dejo de ver el curso',
        example: '12/05/2024'
      })
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