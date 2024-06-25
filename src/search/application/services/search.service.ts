import { SearchRequestDto } from "../dtos/request/search-request.dto";
import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { SearchResponseDto } from "../dtos/response/search-response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { IService } from "src/common/application/interfaces/IService";
import { Blog } from "src/blog/domain/Blog";
import { Course } from "src/course/domain/Course";

export class SearchService extends IService<SearchRequestDto, SearchResponseDto> {

  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly blogRepository: IBlogRepository
  ) { super() }

  async execute(value: SearchRequestDto): Promise<Result<SearchResponseDto>> {
    let courseResult: Result<Course[]>; let blogsResult: Result<Blog[]>;
    let courses: Course[] = []; let blogs: Blog[] = [];

    if (value.tags) {
      courseResult = await this.courseRepository.getManyCourses(value.tags);
      if (!courseResult.isSuccess) { return Result.fail(courseResult.Error, courseResult.StatusCode, courseResult.Message); };
      blogsResult = await this.blogRepository.getBlogsTagsNames(value.tags);
      if (!blogsResult.isSuccess) { return Result.fail(blogsResult.Error, blogsResult.StatusCode, blogsResult.Message); };

    } else {
      courseResult = await this.courseRepository.getAllCourses();
      if (!courseResult.isSuccess) { return Result.fail(courseResult.Error, courseResult.StatusCode, courseResult.Message); };
      blogsResult = await this.blogRepository.getAllBLogs();
      if (!blogsResult.isSuccess) { return Result.fail(blogsResult.Error, blogsResult.StatusCode, blogsResult.Message); };

    }

    courses = courseResult.Value;
    blogs = blogsResult.Value;

    if (value.term) {
      courses = courses.filter((course) => (
        (course.Title.value.search(new RegExp(value.term, "i")) != -1) ||
        (course.Description.value.search(new RegExp(value.term, "i")) != -1)
      ));

      blogs = blogs.filter((blog) => (
        (blog.title.search(new RegExp(value.term, "i")) != -1) ||
        (blog.content.search(new RegExp(value.term, "i")) != -1)
      ));
    }

    //TODO: añadir sorting (creo que se puede directamente con array.sort(funcion de ordenado))

    if (value.perpage) {
      let page = value.page;
      if (!page) { page = 0 }

      courses = courses.slice((page * value.perpage), (value.perpage) + (page * value.perpage));
      blogs = blogs.slice((page * value.perpage), (value.perpage) + (page * value.perpage));
    }


    const response = new SearchResponseDto(blogs, courses);
    return Result.success(response, 200);
  }

}