import { GetCourseByIdRequest, GetCourseByIdResponse, GetCourseByIdService } from "src/course/application/services/getCourseById.service";
import { CourseNotFoundException } from "src/course/domain/exceptions/courseNotFound";
import { NullCourseIdException } from "src/course/domain/exceptions/nullCourseId";
import { OdmCategoryRepositoryMock } from "test/common/repositories-mocks/odm-category-repository.mok";
import { OdmCourseRepositoryMock } from "test/common/repositories-mocks/odm-course-repository.mock";
import { OdmTrainerRepositoryMock } from "test/common/repositories-mocks/odm-trainer-repository.mok";

describe('Obtener un curso por id', () => {
    it('Se debe obtener correctamente un curso ', async () => {
        let odmBlogRepositoryMock =  new OdmCourseRepositoryMock();
        const request = new GetCourseByIdRequest('4a370052-3c3d-4a18-9ba1-a9fd5336a145');
        const getCourseByIdService = new GetCourseByIdService(
            odmBlogRepositoryMock,
            new OdmTrainerRepositoryMock(),
            new OdmCategoryRepositoryMock()
        )
        const response = await getCourseByIdService.execute(request);
        expect(response.isSuccess).toBeTruthy();
        expect(response.Value).toBe(
            new GetCourseByIdResponse(
                '4a370052-3c3d-4a18-9ba1-a9fd5336a145',
                'Yoga para Principiantes',
                'una descripcion',
                'ca701b5b-0e6b-41a8-99d5-c1faeef6d5cf', 
                'https://res.cloudinary.com/dhrnlh0kg/image/upload/v1718305862/dy0o7ppdrquv4rjtkyn8.jpg',
                {
                    id: 'dc20a55c-791a-434d-9791-c0e119251968',
                    name: 'Roman Peterson'
                },
                'Principiante',
                1,
                30,
                [],
                new Date('Tue Jul 10 2024 12:30:00 GMT-0400 (Eastern Daylight Time)'),
                [{
                    id: '62d3f486-3563-4525-acc4-4c0b22998c65',
                    title: 'leccion 1',
                    content: 'Contenido',
                    video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/lfc9awszmicb9k02uzkd.mp4'
                }],
            )
        )
    })

    it('Se debe generar un error al ser un Id que no existe', async () => {
        let odmBlogRepositoryMock =  new OdmCourseRepositoryMock();
        const request = new GetCourseByIdRequest('17ae64e6-6ac4-4ca9-9272-9726578b83cf');
        const getCourseByIdService = new GetCourseByIdService(
            odmBlogRepositoryMock,
            new OdmTrainerRepositoryMock(),
            new OdmCategoryRepositoryMock()
        )
        try {
            await getCourseByIdService.execute(request);
        } catch (err) {
            expect(err).toBeInstanceOf(CourseNotFoundException);
        }
        expect.assertions(1)
    })

    it('Se debe generar un error al enviar un Id vacio', async () => {
        let odmBlogRepositoryMock =  new OdmCourseRepositoryMock();
        const request = new GetCourseByIdRequest('');
        const getCourseByIdService = new GetCourseByIdService(
            odmBlogRepositoryMock,
            new OdmTrainerRepositoryMock(),
            new OdmCategoryRepositoryMock()
        )
        try {
            await getCourseByIdService.execute(request);
        } catch (err) {
            console.log(typeof err)
            expect(err).toBeInstanceOf(NullCourseIdException);
        }
        expect.assertions(1)
    })

});