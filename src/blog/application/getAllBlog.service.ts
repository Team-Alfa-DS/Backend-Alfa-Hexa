import { IBlogRepository } from '../domain/repositories/IBlog.repository';
import { Blog } from '../domain/Blog';



export class GetAllBlogService {
    constructor(
        private readonly blogRepository: IBlogRepository
    ) {}

    execute(): Promise<Blog[]>{
        return this.blogRepository.getAllBLogs();
    }
}