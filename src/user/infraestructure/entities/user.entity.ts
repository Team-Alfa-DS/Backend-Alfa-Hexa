import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "src/comment/infraestructure/entities/comment.entity";
import { Progress } from "./progress.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    type: string;

    @Column()
    image: string;

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Progress, progress => progress.user)
    progress: Progress[];
}