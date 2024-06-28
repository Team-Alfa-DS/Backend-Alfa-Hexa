import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { OrmUserEntity } from "src/user/infraestructure/entities/orm-entities/orm-user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('notify')
export class NotifyEntity {

    @ApiProperty({
        description: 'Id de la notificacion',
        example: 'asre457'
      })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({
        description: 'Titulo de la notificacion',
        example: 'Subscripcion al curso'
      })
    @Column()
    title: string;

    @ApiProperty({
        description: 'Desarrollo de la notificacion',
        example: 'Te has subscrito correctamente al curso'
      })
    @Column()
    body: string;

    @ApiProperty({
        description: 'Fecha de la notificacion',
        example: '24/08/2024'
      })
    @Column({type:'date', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @ApiProperty({
        description: 'Atributo que permite saber su el usuario vio la notificacion',
        example: 'True'
      })
    @Column()
    userReaded: boolean;

    @ManyToOne(() => OrmUserEntity, user => user.notify)
    @JoinColumn({name: 'user_id'})
    user: OrmUserEntity;


    static create (
        id: string, 
        title: string,
        body: string,
        date: Date,
        userReaded: boolean
    ) {
        const notify = new NotifyEntity()
        notify.id = id;
        notify.title = title;
        notify.body = body;
        notify.date = date;
        notify.userReaded = userReaded;
        return notify
    }
}

