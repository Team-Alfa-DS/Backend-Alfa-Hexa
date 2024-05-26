import { IApplicationService } from "src/common/application-service.interface/aplication-service.interface";
import { GetLessonCommentsServiceDto } from "../../dto/lesson/lesson-comment.response.dto";
import { Result } from "src/common/domain/result-handler/result";

export class GetCommentLessonService implements IApplicationService<GetLessonCommentsServiceDto,any>{
    execute(value: GetLessonCommentsServiceDto): Promise<Result<any>> {
        throw new Error("Method not implemented.");
    }

}