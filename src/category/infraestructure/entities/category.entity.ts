import { ApiProperty } from "@nestjs/swagger";
import { BlogEntity } from "src/blog/infraestructure/entities/blog.entity";
import { CourseEntity } from "src/course/infraestructure/entities/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity {
   
    @ApiProperty({
        description: 'Id de la categoria',
        example: '75645sd342435456gfdss'
      })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({
        description: 'nombre de la categoria',
        example: 'yoga'
      })
    @Column()
    name: string;


    @ApiProperty({
        description: 'Icono de la categoria',
        example: 'url:'
      })
    @Column()
    icon: string;

    @OneToMany(() => BlogEntity, blog => blog.category)
    blogs: BlogEntity[];

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