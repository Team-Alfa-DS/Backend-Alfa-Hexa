import { BcryptEncryptor } from "src/auth/infraestructure/encryptor/bcrypt";
import { AddCommentToServiceRequestDto } from "src/comment/application/dto/blog/add-comment-to-service.dto";
import { GetBlogCommentsServiceRequestDto } from "src/comment/application/dto/blog/blog-comment.response.dto";
import { RegisterBlogCommentServices } from "src/comment/application/service/command/register-blog-comment.service";
import { RegisterLessonCommentServices } from "src/comment/application/service/command/register-lesson-comment.service";
import { GetCommentBlogService } from "src/comment/application/service/query/get-comment-blog.service";
import { EmptyBlogCommentBlogIdException } from "src/comment/domain/exceptions/blog/empty-comment-blog-blogid-exception";
import { EmptyBlogCommentUserIdException } from "src/comment/domain/exceptions/blog/empty-comment-blog-userid-exception";
import { InvalidBlogCommentBodyException } from "src/comment/domain/exceptions/blog/invalid-comment-blog-body-exception";
import { UuidGen } from "src/common/infraestructure/id-gen/uuid-gen";
import { EventBusMock } from "test/common/event-manager/event-bus.mock";
import { OrmBlogRepositoryMock } from "test/common/repositories-mocks/orm-blog-repository.mok";
import { OrmUserRepositoryMock } from "test/common/repositories-mocks/orm-user-repository.mock";
import { TransactionHandlerMock } from "test/common/transaction-handler-mock/transaction-handler.mock";



describe('Create CommentBlog', () => {
    it('Se debe crear correctamente un comentario de Blog ', async () => {
        let ormBlogRepositoryMock = new OrmBlogRepositoryMock();
        const request = new AddCommentToServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', `244fbecc-2127-433d-ba76-762fb2fee1c8`, `Buenas tardes`);
        const registerCommentBlogService = new RegisterBlogCommentServices(
            new OrmBlogRepositoryMock(),
            new OrmUserRepositoryMock(),
            ormBlogRepositoryMock,
            new TransactionHandlerMock(),
            new UuidGen(),
            new EventBusMock(),
        )
        const response = await registerCommentBlogService.execute(request);
        expect(response.isSuccess).toBeTruthy();
    })

    it('Debe generar un error por ID de blog vacio ', async () => {
        let ormBlogRepositoryMock = new OrmBlogRepositoryMock();
        const request = new AddCommentToServiceRequestDto('', `244fbecc-2127-433d-ba76-762fb2fee1c8`, `Buenas tardes`);
        const registerCommentBlogService = new RegisterBlogCommentServices(
            new OrmBlogRepositoryMock(),
            new OrmUserRepositoryMock(),
            ormBlogRepositoryMock,
            new TransactionHandlerMock(),
            new UuidGen(),
            new EventBusMock(),
        )
        try {
            await registerCommentBlogService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(EmptyBlogCommentBlogIdException);
        }
        expect.assertions(1)
    })

    it('Debe generar un error por ID de User vacio ', async () => {
        let ormBlogRepositoryMock = new OrmBlogRepositoryMock();
        const request = new AddCommentToServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', ``, `Buenas tardes`);
        const registerCommentBlogService = new RegisterBlogCommentServices(
            new OrmBlogRepositoryMock(),
            new OrmUserRepositoryMock(),
            ormBlogRepositoryMock,
            new TransactionHandlerMock(),
            new UuidGen(),
            new EventBusMock(),
        )
        try {
            await registerCommentBlogService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(EmptyBlogCommentUserIdException);
        }
        expect.assertions(1)
    })
    
    it('Debe generar un error por body vacio ', async () => {
        let ormBlogRepositoryMock = new OrmBlogRepositoryMock();
        const request = new AddCommentToServiceRequestDto('17ae64e6-6ac4-4ca9-9272-9726578b83cf', `244fbecc-2127-433d-ba76-762fb2fee1c8`, ``);
        const registerCommentBlogService = new RegisterBlogCommentServices(
            new OrmBlogRepositoryMock(),
            new OrmUserRepositoryMock(),
            ormBlogRepositoryMock,
            new TransactionHandlerMock(),
            new UuidGen(),
            new EventBusMock(),
        )
        try {
            await registerCommentBlogService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidBlogCommentBodyException);
        }
        expect.assertions(1)
    })
});