// import { Blog } from "src/blog/infraestructure/entities/blog.entity";
import { Blog } from "src/blog/domain/Blog";
import { ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Course } from "src/course/domain/Course";
import { BlogResponseDto } from "./search-blogResponse.dto";
import { CourseResponseDto } from "./search-courseResponse.dto";

export class SearchResponseDto implements ServiceResponseDto {
  readonly blogs: BlogResponseDto[];
  readonly courses: CourseResponseDto[];

  constructor(blogs: BlogResponseDto[], courses: CourseResponseDto[]) {
    this.blogs = blogs;
    this.courses = courses;
  }

  dataToString(): string {
    return `SearchResponse: { Blogs: ${JSON.stringify(this.blogs)} | Courses: ${JSON.stringify(this.courses)} }`;
  }
}