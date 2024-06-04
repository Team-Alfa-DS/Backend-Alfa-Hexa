import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { CourseEntity } from "src/course/infraestructure/entities/course.entity";

@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => BlogEntity, blog => blog.tags)
    blogs: BlogEntity[];

    @ManyToMany(() => CourseEntity, course => course.tags)
    courses: CourseEntity[];
}