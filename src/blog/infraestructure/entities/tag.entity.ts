import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";
import { CourseEntity } from "src/course/infraestructure/entities/course.entity";

@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Blog, blog => blog.tags)
    blogs: Blog[];

    @ManyToMany(() => CourseEntity, course => course.tags)
    courses: CourseEntity[];
}