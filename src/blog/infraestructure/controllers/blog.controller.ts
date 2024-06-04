import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetAllBlogService } from "src/blog/application/getAllBlog.service";
import { GetBlogByIdService } from "src/blog/application/getBlogById.service";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { OrmBlogRepository } from "../repositories/ormBlog.repository";



@ApiTags('Blog') 
@Controller('blog')
export class BlogController {
    private readonly getAllBlogService: GetAllBlogService;
    private readonly getBlogByIdService: GetBlogByIdService;

    constructor() {
        const repositoryInstance = new OrmBlogRepository(DatabaseSingleton.getInstance());
        this.getAllBlogService = new GetAllBlogService(repositoryInstance);
        this.getBlogByIdService = new GetBlogByIdService(repositoryInstance);
    }

    @Get('one/:id')
    getBlogById(@Param('id') blogId: string) {
        return this.getBlogByIdService.execute(blogId);
    }

    @Get('many')
    getAllBlogs() {
        return this.getAllBlogService.execute();
    }
}