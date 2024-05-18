import { Blog } from "src/blog/infraestructure/entities/blog.entity";
import { User } from "src/user/infraestructure/entities/user.entity";
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

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Blog, blog => blog.comments)
    @JoinColumn({name: 'blog_id'})
    blog: Blog;
}