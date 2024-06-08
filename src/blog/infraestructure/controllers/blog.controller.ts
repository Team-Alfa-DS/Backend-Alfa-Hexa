import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetAllBlogService } from "src/blog/application/getAllBlog.service";
import { GetBlogByIdService } from "src/blog/application/getBlogById.service";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { OrmBlogRepository } from "../repositories/ormBlog.repository";
import { OrmTrainerRepository } from "src/trainer/infraestructure/repositories/orm-trainer.repositorie";
import { OrmTrainerMapper } from "src/trainer/infraestructure/mapper/orm-trainer.mapper";
import { OrmCategoryRepository } from "src/category/infraestructure/repositories/orm-category.repository";
import { OrmCategoryMapper } from "src/category/infraestructure/mapper/orm-category.mapper";
import { Result } from "src/common/domain/result-handler/result";
import { GetAllBlogsResponseDTO } from "src/blog/application/interfaces/getAllBlogsResponseDTO.interface";



@ApiTags('Blog') 
@Controller('blog')
export class BlogController {
    private readonly getAllBlogService: GetAllBlogService;
    private readonly getBlogByIdService: GetBlogByIdService;

    constructor() {
        const blogRepositoryInstance = new OrmBlogRepository(DatabaseSingleton.getInstance());
        const trainerRepositoryInstance = new OrmTrainerRepository(new OrmTrainerMapper(), DatabaseSingleton.getInstance());
        const categoryRepositoryInstance = new OrmCategoryRepository(new OrmCategoryMapper, DatabaseSingleton.getInstance())
        this.getAllBlogService = new GetAllBlogService(blogRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance);
        this.getBlogByIdService = new GetBlogByIdService(blogRepositoryInstance);


    }

    @Get('one/:id')
    getBlogById(@Param('id') blogId: string) {
        return this.getBlogByIdService.execute(blogId);
    }

    @Get('many')
    async  getAllBlogs() {
        const result: Result<GetAllBlogsResponseDTO>  =  await this.getAllBlogService.execute();
        if (result.Value)
            return result.Value
        return result.Error
    }
}