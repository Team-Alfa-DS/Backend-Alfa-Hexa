// import { Blog } from "src/blog/infraestructure/entities/blog.entity";
import { Course } from "src/course/domain/Course";

export class SearchResponseDto {
    blogs: any;  //TODO: Cambiar a blogs
    courses: Course;
}