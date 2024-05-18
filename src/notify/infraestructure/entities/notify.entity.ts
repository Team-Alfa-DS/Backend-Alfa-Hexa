import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notify')
export class Notify {
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
}