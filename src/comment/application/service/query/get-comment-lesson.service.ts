import { GetLessonCommentServiceResponseDto, GetLessonCommentsServiceRequestDto, LessonComment } from "../../dto/lesson/lesson-comment.response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IService } from "src/common/application/interfaces/IService";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";

export class GetCommentLessonService extends IService<GetLessonCommentsServiceRequestDto, GetLessonCommentServiceResponseDto>{
    
    private readonly courseRepository: ICourseRepository

    constructor(
        courseRepository: ICourseRepository,
    ){
        super();
        this.courseRepository = courseRepository;
    }
    
    async execute(data: GetLessonCommentsServiceRequestDto): Promise<Result<GetLessonCommentServiceResponseDto>> {

        if (!data.pagination.page) data.pagination.page = 0;
        
        let lessonId = LessonCommentLessonId.create(LessonId.create(data.lessonId));

        const comments = await this.courseRepository.findAllCommentsByLessonId(
            lessonId
        );
        
        if (!comments.isSuccess)  return Result.fail(comments.Error);

        let commentsRes: LessonComment[] = [];
        for (const comment of comments.Value) {
            commentsRes.push({
                id: comment.Id.commentId, 
                user: comment.UserId.UserId, 
                body: comment.Body.Body, 
                userLiked: comment.UserLiked.UserLiked, 
                userDisliked: comment.UserDisliked.UserDisliked, 
                date: comment.PublicationDate.PublicationDate})
        };

        if (data.pagination.perPage) {
            let page = data.pagination.page;
            if (!page) {page = 0}

            commentsRes = commentsRes.slice((page*data.pagination.perPage), (data.pagination.perPage) + (page*data.pagination.perPage));
        }

        const response = new GetLessonCommentServiceResponseDto(commentsRes)
        return Result.success<GetLessonCommentServiceResponseDto>(response);
    }

}