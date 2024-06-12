import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from './blog.entity';

@Entity('image')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @ManyToOne(() => BlogEntity, blog => blog.images)
    @JoinColumn({name: 'blog_id'})
    blog: BlogEntity;
}