import { Blog } from "src/blog/infraestructure/entities/blog.entity";
import { Course } from "src/course/infraestructure/entities/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    icon: string;

    @OneToMany(() => Blog, blog => blog.category)
    blogs: Blog[];

    @OneToMany(() => Course, course => course.category)
    courses: Course[];
}