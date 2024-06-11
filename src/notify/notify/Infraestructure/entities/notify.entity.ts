import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";

@Entity('notify')
export class NotifyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({type:'date', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @Column()
    userReaded: boolean;

    @ManyToOne(() => UserEntity, user => user.notify)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;


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

