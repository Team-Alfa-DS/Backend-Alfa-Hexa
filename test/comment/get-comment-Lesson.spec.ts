import { GetLessonCommentsServiceRequestDto } from "src/comment/application/dto/lesson/lesson-comment.response.dto";
import { GetCommentLessonService } from "src/comment/application/service/query/get-comment-lesson.service";
import { EmptyLessonCommentLessonIdException } from "src/comment/domain/exceptions/lesson/empty-comment-lesson-lessonid-exception";
import { EmptyLessonCommentUserIdException } from "src/comment/domain/exceptions/lesson/empty-comment-lesson-userid-exception";
import { OdmCourseRepositoryMock } from "test/common/repositories-mocks/odm-course-repository.mock";



describe('Comment get CommentLesson', () => {
    
    it('Debe obtener comentarios de Leccion', async () => {
        let odmCourseRepositoryMock = new OdmCourseRepositoryMock();
        let pagination: number[] = [0, 0];
        const request = new GetLessonCommentsServiceRequestDto('62d3f486-3563-4525-acc4-4c0b22998c65', { page: 0, perPage: 0 }, `244fbecc-2127-433d-ba76-762fb2fee1c8`);
        const getCommentLessonService = new GetCommentLessonService(
            odmCourseRepositoryMock
        )
        const response = await getCommentLessonService.execute(request);
        expect(response.isSuccess).toBeTruthy();
    })

    it('Debe fallar por un Id de Leccion vacio', async () => {
        let odmCourseRepositoryMock = new OdmCourseRepositoryMock();
        let pagination: number[] = [0, 0];
        const request = new GetLessonCommentsServiceRequestDto('', { page: 0, perPage: 0 }, `244fbecc-2127-433d-ba76-762fb2fee1c8`);
        const getCommentBlogService = new GetCommentLessonService(
            odmCourseRepositoryMock
        )
        try {
            const res = await getCommentBlogService.execute(request);
            expect(res.Error).toBeInstanceOf(EmptyLessonCommentLessonIdException);
        } catch (err) {
        }
        expect.assertions(1)
    })

    it('Debe fallar por un Id de User vacio', async () => {
        let odmCourseRepositoryMock = new OdmCourseRepositoryMock();
        let pagination: number[] = [0, 0];
        const request = new GetLessonCommentsServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', { page: 0, perPage: 0 }, ``);
        const getCommentBlogService = new GetCommentLessonService(
            odmCourseRepositoryMock
        )
        try {
            const res = await getCommentBlogService.execute(request);
            expect(res.Error).toBeInstanceOf(EmptyLessonCommentUserIdException);
        } catch (err) {
        }
        expect.assertions(1)
    })
    
})