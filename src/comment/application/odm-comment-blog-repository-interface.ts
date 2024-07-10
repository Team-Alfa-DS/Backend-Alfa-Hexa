import { Result } from "src/common/domain/result-handler/result";
import { BlogCommentBlogId } from "../domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlog } from "../domain/comment-blog";

export interface IOdmBlogCommentRepository {
    findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>>;
}