import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/comment/infraestructure/entities/comment.entity";
import { ProgressEntity } from "./progress.entity";

@Entity('user')
export class UserEntity {
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

    @Column({nullable: true})
    image: string;

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => ProgressEntity, progress => progress.user)
    progress: ProgressEntity[];
}