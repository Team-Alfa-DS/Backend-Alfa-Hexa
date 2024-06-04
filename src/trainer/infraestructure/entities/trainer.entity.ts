import { BlogEntity } from "src/blog/infraestructure/entities/blog.entity";
import { CourseEntity } from "src/course/infraestructure/entities/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('trainer')
export class Trainer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    followers: number;

    @Column()
    userFollow: boolean

    @Column()
    location: string

    @OneToMany(() => BlogEntity, blog => blog.trainer)
    blogs: BlogEntity[];

    @OneToMany(() => CourseEntity, course => course.trainer)
    courses: CourseEntity[];
}