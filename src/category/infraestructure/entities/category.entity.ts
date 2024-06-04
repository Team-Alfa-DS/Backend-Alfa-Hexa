import { BlogEntity } from "src/blog/infraestructure/entities/blog.entity";
import { CourseEntity } from "src/course/infraestructure/entities/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    icon: string;

    @OneToMany(() => BlogEntity, blog => blog.category)
    blogs: BlogEntity[];

    @OneToMany(() => CourseEntity, course => course.category)
    courses: CourseEntity[];
}