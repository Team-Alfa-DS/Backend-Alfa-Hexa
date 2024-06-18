import { error } from "console";
import { Blog } from "../domain/Blog";
import { IBlogRepository } from "../domain/repositories/IBlog.repository";
import { GetBlogByIdRequestDTO, GetBlogByIdResponseDTO } from "./interfaces/getBlogByIdDTOS.interface";
import { IService } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";


export class GetBlogByIdService extends IService<GetBlogByIdRequestDTO,  GetBlogByIdResponseDTO >{
    constructor(
        private readonly blogRepository: IBlogRepository,
        private readonly trainerRepository: ITrainerRepository,
        private readonly categoryRepository: ICategoryRepository
    ) {
        super();
    }
    get name(): string {
        return this.constructor.name;
    }

    async execute({id}: GetBlogByIdRequestDTO): Promise<Result<GetBlogByIdResponseDTO>>{
        const domainBlogResult = await this.blogRepository.getBlogById(id);
        if (domainBlogResult.Error)
            return Result.fail(domainBlogResult.Error, domainBlogResult.StatusCode, domainBlogResult.Message);
        const domainBlog = domainBlogResult.Value;
        const trainerResult = await this.trainerRepository.findTrainerById(domainBlog.trainer);
        const categoryResult = await this.categoryRepository.getCategoryById(domainBlog.category)
        const blogResponse: GetBlogByIdResponseDTO = new GetBlogByIdResponseDTO(
            domainBlog.title.value,
            domainBlog.content.value,
            categoryResult.Value ? categoryResult.Value.name : null,    
            domainBlog.images.map(image => image.value),
            trainerResult.Value ? {id: trainerResult.Value.Id, name: trainerResult.Value.Name} : {id: null, name: null},
            domainBlog.tags.map(tag => tag.value),
            domainBlog.publication_date.value
        )
        return Result.success(blogResponse, 200);
        

    }
}