import { BlogEntity } from "src/blog/infraestructure/entities/blog.entity";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    publication_date: Date;

    @Column({nullable: true})
    count_likes: string;

    @Column({nullable: true})
    count_dislikes: string;

    @Column()
    body: string;

    @ManyToOne(() => UserEntity, user => user.comments)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @ManyToOne(() => BlogEntity, blog => blog.comments)
    @JoinColumn({name: 'blog_id'})
    blog: BlogEntity;
}