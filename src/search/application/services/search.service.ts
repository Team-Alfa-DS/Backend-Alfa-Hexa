import { SearchRequestDto } from "../dtos/request/search-request.dto";
import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { SearchResponseDto } from "../dtos/response/search-response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";

export class SearchService implements IApplicationService<SearchRequestDto, SearchResponseDto> {

    private readonly courseRepository: ICourseRepository;

    constructor(courseRepository: ICourseRepository) {
        this.courseRepository = courseRepository;
    }

    execute(value: SearchRequestDto): Promise<Result<SearchResponseDto>> {
        throw new Error("Method not implemented.");
    }
    get name(): string {
        return this.constructor.name;
    }

}