import { SearchRequestDto } from "../dtos/request/search-request.dto";
import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { SearchResponseDto } from "../dtos/response/search-response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { IService } from "src/common/application/interfaces/IService";

export class SearchService extends IService<SearchRequestDto, SearchResponseDto> {

    constructor(
        private readonly courseRepository: ICourseRepository,
        private readonly blogRepository: IBlogRepository
    ) {super()}

    async execute(value: SearchRequestDto): Promise<Result<SearchResponseDto>> {
        const coursesResult = await this.courseRepository.getManyCourses(undefined, undefined, undefined, value.page, value.perpage);
        const blogsResult = await this.blogRepository.getAllBLogs();
        
        if (!coursesResult.isSuccess) {return Result.fail(coursesResult.Error, coursesResult.StatusCode, coursesResult.Message); }
        if (!blogsResult.isSuccess) {return Result.fail(blogsResult.Error, blogsResult.StatusCode, blogsResult.Message); }
        
        let courses = coursesResult.Value;
        let blogs = blogsResult.Value;

        if (value.tags) {
            for (let tag of value.tags) {
                courses = courses.filter((course) => course.tags.includes(tag));
                // blogs = blogs.filter((blog) => blog.tags.includes(tag));
            }
        }

        if (value.term) {
            courses = courses.filter((course) => (
                (course.name.search(new RegExp(value.term, "i")) != -1) ||
                (course.description.search(new RegExp(value.term, "i")) != -1) 
            ))

            //TODO: añadir sorting (creo que se puede directamente con array.sort(funcion de ordenado))
        }
    }

}