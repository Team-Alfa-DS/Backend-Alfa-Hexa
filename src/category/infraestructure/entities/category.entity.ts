/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Blog } from "src/blog/infraestructure/entities/blog.entity";
import { CourseEntity } from "src/course/infraestructure/entities/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity {
   
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    icon: string;

    @OneToMany(() => Blog, blog => blog.category)
    blogs: Blog[];

    @OneToMany(() => CourseEntity, course => course.category)
    courses: CourseEntity[];

    static create (
        id: string, 
        name: string,
        icon: string 
    ) {
        const category = new CategoryEntity()
        category.id = id;
        category.name = name;
        category.icon = icon;

        return category
    }
}