import { GetCourseCountRequest, GetCourseCountResponse, GetCourseCountService } from "src/course/application/services/getCourseCount.service";
import { OdmCourseRepositoryMock } from "test/common/repositories-mocks/odm-course-repository.mock";


describe('Contar curso', async () => {
    it('Se debe obtener correctamente un conteo de cursos ', async () => {
        let odmBlogRepositoryMock =  new OdmCourseRepositoryMock();
        const request = new GetCourseCountRequest('','');
        const getCourseCountService = new GetCourseCountService(
            odmBlogRepositoryMock
        )
        const response = await getCourseCountService.execute(request);
        expect(response.isSuccess).toBeTruthy();
        expect(response.Value).toBe(
            new GetCourseCountResponse(1)
        )
    })
});