import { OrmBlogEntity } from "src/blog/infraestructure/entities/orm-entities/orm-blog.entity";
import { OrmCourseEntity } from "src/course/infraestructure/entities/orm-entities/orm-course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class OrmCategoryEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    icon: string;

    @OneToMany(() => OrmBlogEntity, blog => blog.category)
    blogs: OrmBlogEntity[];

    @OneToMany(() => OrmCourseEntity, course => course.category)
    courses: OrmCourseEntity[];

    static create (
        id: string, 
        name: string,
        icon: string 
    ) {
        const category = new OrmCategoryEntity()
        category.id = id;
        category.name = name;
        category.icon = icon;

        return category
    }
}