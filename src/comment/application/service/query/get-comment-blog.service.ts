import { Result } from "src/common/domain/result-handler/result";
import { BlogComment, GetBlogCommentServiceResponseDto, GetBlogCommentsServiceRequestDto } from "../../dto/blog/blog-comment.response.dto";
import { IService } from "src/common/application/interfaces/IService";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";

export class GetCommentBlogService extends IService<GetBlogCommentsServiceRequestDto, GetBlogCommentServiceResponseDto>{
    
    private readonly blogRepository: IBlogRepository;

    constructor(
        blogRepository: IBlogRepository,
    ){
        super();
        this.blogRepository = blogRepository;
    }
    
    async execute(data : GetBlogCommentsServiceRequestDto): Promise<Result<GetBlogCommentServiceResponseDto>> {
        const blogId = BlogCommentBlogId.create( BlogId.create(data.blogId) );

        const comments = await this.blogRepository.findAllCommentsByBlogId(
            blogId
        );
                
        if (!comments.isSuccess)  return Result.fail(comments.Error);
        let commentsRes: BlogComment[] = [];
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

        const response = new GetBlogCommentServiceResponseDto(commentsRes)
        return Result.success<GetBlogCommentServiceResponseDto>(response);
    }
}