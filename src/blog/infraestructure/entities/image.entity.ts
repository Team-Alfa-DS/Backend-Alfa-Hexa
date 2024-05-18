import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";

@Entity('image')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @ManyToOne(() => Blog, blog => blog.images)
    @JoinColumn({name: 'blog_id'})
    blog: Blog;
}