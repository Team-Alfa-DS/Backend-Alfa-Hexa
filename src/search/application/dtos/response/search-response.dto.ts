// import { Blog } from "src/blog/infraestructure/entities/blog.entity";
import { Blog } from "src/blog/domain/Blog";
import { ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Course } from "src/course/domain/entities/Course";

export class SearchResponseDto implements ServiceResponseDto{
    constructor(
        readonly blogs: Blog[],
        readonly courses: Course[]
    ) {}

    dataToString(): string {
        return `SearchResponse: { Blogs: ${JSON.stringify(this.blogs)} | Courses: ${JSON.stringify(this.courses)} }`;
    }
}