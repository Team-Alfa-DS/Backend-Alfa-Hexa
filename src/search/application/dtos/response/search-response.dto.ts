// import { Blog } from "src/blog/infraestructure/entities/orm-entities/orm-blog.entity";
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
    // for (let blog of blogs) {
    //   this.blogs.push(
    //     new BlogResponseDto(
    //       blog.Id.value,
    //       blog.Title.value,
    //       blog.Images[0].value,
    //       blog.Publication_date.,
    //       blog.Category.value,
          
    //     )
    //   )
    // }

    // for (let course of courses) {
    //   this.courses.push(
    //     new CourseResponseDto(
    //       course.Id.Value,
    //       course.Title.value,
    //       course.Image.Value,
    //       course.Date,
    //       course.Category.name,
    //       course.Trainer.id.value //FIXME: Hay que adaptar la búsqueda de entrenadores por ID
    //     )
    //   );
    // }
  }

  dataToString(): string {
    return `SearchResponse: { Blogs: ${JSON.stringify(this.blogs)} | Courses: ${JSON.stringify(this.courses)} }`;
  }
}