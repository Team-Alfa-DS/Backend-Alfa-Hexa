
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
        private readonly categoryRepository: ICategoryRepository,
    ) {
        super();
    }
    get name(): string {
        return this.constructor.name;
    }

    async execute({id}: GetBlogByIdRequestDTO): Promise<Result<GetBlogByIdResponseDTO>>{
        try {
            const domainBlogResult = await this.blogRepository.getBlogById(id);
            if (domainBlogResult.Error)
                return Result.fail(domainBlogResult.Error);
            const domainBlog = domainBlogResult.Value;
            const trainerResult = await this.trainerRepository.findTrainerById(domainBlog.Trainer);
            const categoryResult = await this.categoryRepository.getCategoryById(domainBlog.Category)
            const blogResponse: GetBlogByIdResponseDTO = new GetBlogByIdResponseDTO(
                domainBlog.Title.value,
                domainBlog.Content.value,
                categoryResult.Value ? categoryResult.Value.Name.value : null,    
                domainBlog.Images.map(image => image.value),
                trainerResult.Value ? {id: trainerResult.Value.Id.trainerId, name: trainerResult.Value.Name.trainerName} : {id: null, name: null},
                domainBlog.Tags.map(tag => tag.value),
                domainBlog.Publication_date.value
            )
            return Result.success(blogResponse);
        } catch (error) {
            return Result.fail(error);
        }
        

    }
}