import { SearchRequestDto } from "../dtos/request/search-request.dto";
import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { SearchResponseDto } from "../dtos/response/search-response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { IService } from "src/common/application/interfaces/IService";
import { Blog } from "src/blog/domain/Blog";
import { Course } from "src/course/domain/Course";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { CourseResponseDto } from "../dtos/response/search-courseResponse.dto";
import { BlogResponseDto } from "../dtos/response/search-blogResponse.dto";
import { Trainer } from "src/trainer/domain/trainer";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { Category } from "src/category/domain/Category";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { CourseTag } from "src/course/domain/value-objects/course-tag";

export class SearchService extends IService<SearchRequestDto, SearchResponseDto> {

  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly blogRepository: IBlogRepository,
    private readonly trainerRepository: ITrainerRepository,
    private readonly categoryRepository: ICategoryRepository
  ) { super() }

  async execute(value: SearchRequestDto): Promise<Result<SearchResponseDto>> {
    let blogsResult: Result<Blog[]>;
    let courses: Course[] = []; let blogs: Blog[] = [];
    let courseTags: CourseTag[] = [];
    if (value.tags) {
      for (let tag of value.tags) {
        courseTags.push(new CourseTag(tag));
      }
      courses = await this.courseRepository.getManyCourses(courseTags);
      // if (!courseResult.isSuccess) { return Result.fail(courseResult.Error); };
      blogsResult = await this.blogRepository.getBlogsTagsNames(value.tags);
      if (!blogsResult.isSuccess) { return Result.fail(blogsResult.Error); };

    } else {
      courses = await this.courseRepository.getAllCourses();
      // if (!courseResult.isSuccess) { return Result.fail(courseResult.Error); };
      blogsResult = await this.blogRepository.getAllBLogs();
      if (!blogsResult.isSuccess) { return Result.fail(blogsResult.Error); };

    }

    // courses = courseResult.Value;
    blogs = blogsResult.Value;

    if (value.term) {
      courses = courses.filter((course) => (
        (course.Title.value.search(new RegExp(value.term, "i")) != -1) ||
        (course.Description.value.search(new RegExp(value.term, "i")) != -1)
      ));

      blogs = blogs.filter((blog) => (
        (blog.Title.value.search(new RegExp(value.term, "i")) != -1) ||
        (blog.Content.value.search(new RegExp(value.term, "i")) != -1) 
      ));
    }

    //TODO: añadir sorting (creo que se puede directamente con array.sort(funcion de ordenado))

    if (value.perpage) {
      let page = value.page;
      if (!page) { page = 0 }

      courses = courses.slice((page * value.perpage), (value.perpage) + (page * value.perpage));
      blogs = blogs.slice((page * value.perpage), (value.perpage) + (page * value.perpage));
    }

    const coursesDto: CourseResponseDto[] = [];
    const blogsDto: BlogResponseDto[] = [];
    let trainer: Result<Trainer>;
    let category: Result<Category>;
    let image: string;
    for (let course of courses) {
      trainer = await this.trainerRepository.findTrainerById(course.Trainer.value);
      if (!trainer.isSuccess) {return Result.fail(trainer.Error)}
      category = await this.categoryRepository.getCategoryById(course.Category.value);
      if(!category.isSuccess) {return Result.fail(category.Error)}

      coursesDto.push(new CourseResponseDto(
        course.Id.Value,
        course.Title.value,
        course.Image.Value,
        course.Date.value,
        category.Value.Name.value,
        trainer.Value.Name.trainerName
      ));
    }

    for (let blog of blogs) {
      trainer = await this.trainerRepository.findTrainerById(TrainerId.create(blog.Trainer));
      if (!trainer.isSuccess) {return Result.fail(trainer.Error)}
      
      category = await this.categoryRepository.getCategoryById(CategoryId.create(blog.Category.value));
      if (!category.isSuccess) {return Result.fail(category.Error)}
      
      if (blog.Images[0]) { image = blog.Images[0].value} else { image = ''}
      
      blogsDto.push(new BlogResponseDto(
        blog.Id.value,
        blog.Title.value,
        image,
        blog.Publication_date.value,
        category.Value.Name.value,
        trainer.Value.Name.trainerName
      ));
    }

    const response = new SearchResponseDto(blogsDto, coursesDto);
    return Result.success(response);
  }

}