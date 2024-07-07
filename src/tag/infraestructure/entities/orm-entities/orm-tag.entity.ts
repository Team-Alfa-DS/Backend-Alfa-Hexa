import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrmBlogEntity } from "../../../../blog/infraestructure/entities/orm-entities/orm-blog.entity";
import { OrmCourseEntity } from "src/course/infraestructure/entities/orm-entities/orm-course.entity";

@Entity('tag')
export class OrmTagEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => OrmBlogEntity, blog => blog.tags)
    blogs: OrmBlogEntity[];

    @ManyToMany(() => OrmCourseEntity, course => course.tags)
    courses: OrmCourseEntity[];
}