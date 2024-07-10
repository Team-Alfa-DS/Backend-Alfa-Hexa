import { Result } from "src/common/domain/result-handler/result";
import { Blog } from "src/blog/domain/Blog";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";


export class OrmBlogRepositoryMock implements IBlogRepository {

    private readonly blog: Blog
    private readonly blogs: Blog[]
    private readonly comments: CommentBlog[]

    async getAllBLogs(page?: number, perpage?: number, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>> {
        return Result.success(this.blogs)
    }

    async getBlogById(id: string): Promise<Result<Blog>> {
        // Implement your logic here to fetch a blog by its ID
        // Return a Promise<Result<Blog>> with the fetched blog
        return Result.success(this.blog);
    }

    async getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>> {
        return Result.success(this.blogs);
    }

    async saveBlog(blog: Blog): Promise<Result<Blog>> {
        this.blogs.push(blog);
        return Result.success(this.blog)
    }

    async findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>> {
        return Result.success(this.comments);
    }

    async saveComment(comment: CommentBlog): Promise<Result<CommentBlog>> {
        this.comments.push(comment);
        return Result.success(comment)
    }

    async getBlogsCount(category?: string, trainer?: string): Promise<Result<number>> {
        return Result.success(0)
    }
}