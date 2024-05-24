import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notify')
export class NotifyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    date: Date;

    @Column()
    userReaded: boolean;


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

