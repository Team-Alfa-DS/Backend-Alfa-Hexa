
import { GetAllBlogService } from "../../src/blog/application/getAllBlog.service";
import { GetManyBlogsDTO } from "../../src/blog/application/interfaces/getManyBlogsDTO";
import { BlogMockRepository } from "../common/repositories-mocks/blog.repository.mock";
import { CategoryMockRepository } from "../../test/common/repositories-mocks/category.repository.mock";
import { TrainerMockRepository } from "../../test/common/repositories-mocks/trainer.repository.mock";

describe('Test en el getAllBlogsService', () => {
    test(' Debería retornar un array con todos los blogs', async () =>{
        // Arrange
        const blogRepository = new BlogMockRepository();
        const trainerRepository = new TrainerMockRepository();
        const categoryRepository = new CategoryMockRepository();
        const getAllBlogService = new GetAllBlogService(blogRepository, trainerRepository, categoryRepository);
        const getManyBlogsDTO = new GetManyBlogsDTO();
        // Act
        const result = await getAllBlogService.execute(getManyBlogsDTO);
        console.log(result)
        // Assert
        expect(result.Value.blogs).toHaveLength(3);

    })
})