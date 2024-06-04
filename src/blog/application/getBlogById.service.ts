import { Blog } from "../domain/Blog";
import { IBlogRepository } from "../domain/repositories/IBlog.repository";


export class GetBlogByIdService {
    constructor(
        private readonly blogRepository: IBlogRepository
    ) {}

    execute(id: string): Promise<Blog>{
        return this.blogRepository.getBlogById(id);
    }
}