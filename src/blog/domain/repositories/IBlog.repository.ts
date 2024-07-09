import { Blog } from "../Blog";
import { Result } from '../../../common/domain/result-handler/result';
import { CommentBlog } from "src/comment/domain/comment-blog";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";


export interface IBlogRepository {

    getAllBLogs(page?: number, perpage?: number, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>>;

    getBlogById(id: string): Promise<Result<Blog>>;

    getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>>;

    saveBlog(comment: Blog): Promise<Result<Blog>>;

    findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>>;

    saveComment(comment: CommentBlog): Promise<Result<CommentBlog>>;

    getBlogsCount (category?: string, trainer?: string): Promise<Result<number>>;
}