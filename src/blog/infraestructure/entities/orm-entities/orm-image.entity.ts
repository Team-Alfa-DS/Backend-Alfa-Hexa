import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrmBlogEntity } from './orm-blog.entity';

@Entity('image')
export class OrmImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @ManyToOne(() => OrmBlogEntity, blog => blog.images)
    @JoinColumn({name: 'blog_id'})
    blog: OrmBlogEntity;
}