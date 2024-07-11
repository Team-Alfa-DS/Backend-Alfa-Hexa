import { AddCommentToServiceRequestDto } from "src/comment/application/dto/blog/add-comment-to-service.dto";
import { GetBlogCommentsServiceRequestDto } from "src/comment/application/dto/blog/blog-comment.response.dto";
import { RegisterLessonCommentServices } from "src/comment/application/service/command/register-lesson-comment.service";
import { GetCommentBlogService } from "src/comment/application/service/query/get-comment-blog.service";
import { EmptyBlogCommentBlogIdException } from "src/comment/domain/exceptions/blog/empty-comment-blog-blogid-exception";
import { InvalidBlogCommentBodyException } from "src/comment/domain/exceptions/blog/invalid-comment-blog-body-exception";
import { EmptyLessonCommentLessonIdException } from "src/comment/domain/exceptions/lesson/empty-comment-lesson-lessonid-exception";
import { EmptyLessonCommentUserIdException } from "src/comment/domain/exceptions/lesson/empty-comment-lesson-userid-exception";
import { InvalidLessonCommentBodyException } from "src/comment/domain/exceptions/lesson/invalid-comment-lesson-body-exception";
import { UuidGen } from "src/common/infraestructure/id-gen/uuid-gen";
import { EventBusMock } from "test/common/event-manager/event-bus.mock";
import { OdmCourseRepositoryMock } from "test/common/repositories-mocks/odm-course-repository.mock";
import { OrmBlogRepositoryMock } from "test/common/repositories-mocks/orm-blog-repository.mok";
import { OrmCourseRepositoryMock } from "test/common/repositories-mocks/orm-course-repository.mok";
import { OrmUserRepositoryMock } from "test/common/repositories-mocks/orm-user-repository.mock";
import { TransactionHandlerMock } from "test/common/transaction-handler-mock/transaction-handler.mock";



describe('Create CommentLesson', async () => {
    it('Se debe crear correctamente un comentario de Leccion ', async () => {
        let ormCourseRepositoryMock = new OrmCourseRepositoryMock();
        const request = new AddCommentToServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', `244fbecc-2127-433d-ba76-762fb2fee1c8`, `Buenas tardes`);
        const registerCommentBlogService = new RegisterLessonCommentServices(
            new OrmUserRepositoryMock(),
            ormCourseRepositoryMock,
            new OdmCourseRepositoryMock(),
            new TransactionHandlerMock(),
            new EventBusMock(),
            new UuidGen(),
        )

        const response = await registerCommentBlogService.execute(request);
        expect(response.isSuccess).toBeTruthy();
    })

    it('Debe generar un error por ID de Leccion vacio ', async () => {
        let ormCourseRepositoryMock = new OrmCourseRepositoryMock();
        const request = new AddCommentToServiceRequestDto('', `244fbecc-2127-433d-ba76-762fb2fee1c8`, `Buenas tardes`);
        const registerCommentBlogService = new RegisterLessonCommentServices(
            new OrmUserRepositoryMock(),
            ormCourseRepositoryMock,
            new OdmCourseRepositoryMock(),
            new TransactionHandlerMock(),
            new EventBusMock(),
            new UuidGen(),
        )
        try {
            await registerCommentBlogService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(EmptyLessonCommentLessonIdException);
        }
        expect.assertions(1)
    })

    it('Debe generar un error por ID de Usuario vacio ', async () => {
        let ormCourseRepositoryMock = new OrmCourseRepositoryMock();
        const request = new AddCommentToServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', ``, `Buenas tardes`);
        const registerCommentBlogService = new RegisterLessonCommentServices(
            new OrmUserRepositoryMock(),
            ormCourseRepositoryMock,
            new OdmCourseRepositoryMock(),
            new TransactionHandlerMock(),
            new EventBusMock(),
            new UuidGen(),
        )
        try {
            await registerCommentBlogService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(EmptyLessonCommentUserIdException);
        }
        expect.assertions(1)
    })
    
    it('Debe generar un error por Body vacio ', async () => {
        let ormCourseRepositoryMock = new OrmCourseRepositoryMock();
        const request = new AddCommentToServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', `244fbecc-2127-433d-ba76-762fb2fee1c8`, ``);
        const registerCommentBlogService = new RegisterLessonCommentServices(
            new OrmUserRepositoryMock(),
            ormCourseRepositoryMock,
            new OdmCourseRepositoryMock(),
            new TransactionHandlerMock(),
            new EventBusMock(),
            new UuidGen(),
        )
        try {
            await registerCommentBlogService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidLessonCommentBodyException);
        }
        expect.assertions(1)
    })
});