// import { Blog } from "src/blog/infraestructure/entities/blog.entity";
import { Blog } from "src/blog/domain/Blog";
import { ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Course } from "src/course/domain/Course";
import { BlogResponseDto } from "./search-blogResponse.dto";
import { CourseResponseDto } from "./search-courseResponse.dto";

export class SearchResponseDto implements ServiceResponseDto {
  readonly blogs: BlogResponseDto[];
  readonly courses: CourseResponseDto[];

  constructor(blogs: Blog[], courses: Course[]) {
    for (let blog of blogs) {
      this.blogs.push(
        new BlogResponseDto(
          blog.id,
          blog.title,
          blog.images[0].url,
          blog.publication_date,
          blog.category,
          blog.category
        )
      )
    }

    for (let course of courses) {
      this.courses.push(
        new CourseResponseDto(
          course.Id.Value,
          course.Title.value,
          course.Image.Value,
          course.Date,
          course.Category.name,
          course.Trainer.id.value //FIXME: Hay que adaptar la búsqueda de entrenadores por ID
        )
      );
    }
  }

  dataToString(): string {
    return `SearchResponse: { Blogs: ${JSON.stringify(this.blogs)} | Courses: ${JSON.stringify(this.courses)} }`;
  }
}