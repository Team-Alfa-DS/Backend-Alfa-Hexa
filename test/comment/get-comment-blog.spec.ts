import { GetBlogCommentsServiceRequestDto } from "src/comment/application/dto/blog/blog-comment.response.dto";
import { GetCommentBlogService } from "src/comment/application/service/query/get-comment-blog.service";
import { EmptyBlogCommentBlogIdException } from "src/comment/domain/exceptions/blog/empty-comment-blog-blogid-exception";
import { EmptyBlogCommentUserIdException } from "src/comment/domain/exceptions/blog/empty-comment-blog-userid-exception";
import { OdmBlogRepositoryMock } from "test/common/repositories-mocks/odm-blog-repository.mok";



describe('Comment get CommentBlog', async () => {
    it('Debe obtener comentarios de Blog', async () => {
        let odmBlogRepositoryMock = new OdmBlogRepositoryMock();
        let pagination: number[] = [0, 0];
        const request = new GetBlogCommentsServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', { page: 0, perPage: 0 }, `244fbecc-2127-433d-ba76-762fb2fee1c8`);
        const getCommentBlogService = new GetCommentBlogService(
            odmBlogRepositoryMock
        )
        const response = await getCommentBlogService.execute(request);
        expect(response.isSuccess).toBeTruthy();
    })

    it('Debe fallar por un Id de Blog vacio', async () => {
        let odmBlogRepositoryMock = new OdmBlogRepositoryMock();
        let pagination: number[] = [0, 0];
        const request = new GetBlogCommentsServiceRequestDto('', { page: 0, perPage: 0 }, `244fbecc-2127-433d-ba76-762fb2fee1c8`);
        const getCommentBlogService = new GetCommentBlogService(
            odmBlogRepositoryMock
        )
        try {
            await getCommentBlogService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(EmptyBlogCommentBlogIdException);
        }
        expect.assertions(1)
    })

    it('Debe fallar por un Id de User vacio', async () => {
        let odmBlogRepositoryMock = new OdmBlogRepositoryMock();
        let pagination: number[] = [0, 0];
        const request = new GetBlogCommentsServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', { page: 0, perPage: 0 }, ``);
        const getCommentBlogService = new GetCommentBlogService(
            odmBlogRepositoryMock
        )
        try {
            await getCommentBlogService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(EmptyBlogCommentUserIdException);
        }
        expect.assertions(1)
    })
    
})