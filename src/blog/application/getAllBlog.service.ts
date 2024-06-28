import { IBlogRepository } from '../domain/repositories/IBlog.repository';
import { Blog } from '../domain/Blog';
import { IService } from 'src/common/application/interfaces/IService';
import { GeneralBlogDTO, GetAllBlogsResponseDTO } from './interfaces/getAllBlogsResponseDTO.interface';
import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { ICategoryRepository } from 'src/category/domain/repositories/category-repository.interface';
import { GetAllBlogsRequestDTO } from './interfaces/getAllBlogsRequestDTO.interface';
import { TrainerId } from 'src/trainer/domain/valueObjects/trainer-id';


export class GetAllBlogService extends IService<GetAllBlogsRequestDTO, GetAllBlogsResponseDTO>{
    constructor(
        private readonly blogRepository: IBlogRepository,
        private readonly trainerRepository: ITrainerRepository,
        private readonly categoryRepository: ICategoryRepository
    ){
        super()
    }
    get name(): string {
        return this.constructor.name;
    }
    

    async execute(value: GetAllBlogsRequestDTO): Promise<Result<GetAllBlogsResponseDTO>>{
        const prueba = await this.blogRepository.getBlogsTagsNames([ 'Yoga']);
        console.log(prueba.Value);
        const domainBlogsResult =  await this.blogRepository.getAllBLogs();
        if (domainBlogsResult.Error) 
            return Result.fail(domainBlogsResult.Error, domainBlogsResult.StatusCode, domainBlogsResult.Message);

        const domainBlogs = domainBlogsResult.Value; 
        const blogs: GeneralBlogDTO[] = await Promise.all(domainBlogs.map(async blog => {
            const trainerResult = await this.trainerRepository.findTrainerById(TrainerId.create(blog.Trainer));
            const categoryResult = await this.categoryRepository.getCategoryById(blog.Category)
            return {
                id: blog.Id.value,
                name: blog.Title.value,
                image: blog.Images[0].value,
                date: blog.Publication_date.value,
                category: categoryResult.Value ? categoryResult.Value.Name.value : null,
                trainer: trainerResult.Value ? trainerResult.Value.Name.trainerName : null
            }
        }
    ))
        const blogResponse: GetAllBlogsResponseDTO = new GetAllBlogsResponseDTO(blogs)
        return Result.success(blogResponse, 200)
    }
}