import { IBlogRepository } from '../domain/repositories/IBlog.repository';
import { Blog } from '../domain/Blog';
import { IService } from 'src/common/application/interfaces/IService';
import { GeneralBlogDTO, GetAllBlogsResponseDTO } from './interfaces/getAllBlogsResponseDTO.interface';
import { Result } from 'src/common/domain/result-handler/result';
import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
import { ICategoryRepository } from 'src/category/domain/repositories/category-repository.interface';


export class GetAllBlogService implements IService<null, GetAllBlogsResponseDTO>{
    constructor(
        private readonly blogRepository: IBlogRepository,
        private readonly trainerRepository: ITrainerRepository,
        private readonly categoryRepository: ICategoryRepository
    ){

    }
    get name(): string {
        return this.constructor.name;
    }
       

    async execute(): Promise<Result<GetAllBlogsResponseDTO>>{
        const prueba = await this.blogRepository.getBlogsTagsNames([ 'Yoga']);
        console.log(prueba.Value);
        const domainBlogsResult =  await this.blogRepository.getAllBLogs();
        if (domainBlogsResult.Error) 
            return Result.fail(domainBlogsResult.Error, domainBlogsResult.StatusCode, domainBlogsResult.Message);

        const domainBlogs = domainBlogsResult.Value; 
        const blogs: GeneralBlogDTO[] = await Promise.all(domainBlogs.map(async blog => {
            const trainerResult = await this.trainerRepository.findTrainerById(blog.trainer);
            const categoryResult = await this.categoryRepository.getCategoryById(blog.category)
            return {
                Id: blog.id,
                Name: blog.title,
                Image: blog.images[0].url,
                Date: blog.publication_date,
                Category: categoryResult.Value ? categoryResult.Value.name : null,
                Trainer: trainerResult.Value ? trainerResult.Value.Name : null
            }
        }
    ))
        const blogResponse: GetAllBlogsResponseDTO = new GetAllBlogsResponseDTO(blogs)
        return Result.success(blogResponse, 200)
    }
}