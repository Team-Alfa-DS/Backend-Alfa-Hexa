import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/comment/infraestructure/entities/comment.entity";

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

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];
}