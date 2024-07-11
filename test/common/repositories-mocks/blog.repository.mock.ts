import { Blog } from "../../../src/blog/domain/blog";
import { IBlogRepository } from "../../../src/blog/domain/repositories/IBlog.repository";
import { BlogContent } from "../../../src/blog/domain/valueObjects/blogContent";
import { BlogId } from "../../../src/blog/domain/valueObjects/blogId";
import { BlogImage } from "../../../src/blog/domain/valueObjects/blogImage";
import { BlogPublicationDate } from "../../../src/blog/domain/valueObjects/blogPublicationDate";
import { BlogTag } from "../../../src/blog/domain/valueObjects/blogTag";
import { BlogTitle } from "../../../src/blog/domain/valueObjects/blogTitle";
import { CategoryId } from "../../../src/category/domain/valueObjects/categoryId";
import { CommentBlog } from "../../../src/comment/domain/comment-blog";
import { BlogCommentBlogId } from "../../../src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { BlogCommentId } from "../../../src/comment/domain/valueObjects/blog/comment-blog-id";
import { Result } from "../../../src/common/domain/result-handler/result";
import { TrainerId } from "../../../src/trainer/domain/valueObjects/trainer-id";

const blogs = [
    new Blog( BlogId.create('123e4567-e89b-12d3-a456-426614174000'), BlogTitle.create(' Blog 1'), BlogContent.create('Content 1'), BlogPublicationDate.create(new Date()), 
    [BlogCommentId.create('123e4567-e89b-12d3-a456-426614174000')], CategoryId.create('123e4567-e89b-12d3-a456-426614174000'), TrainerId.create('123e4567-e89b-12d3-a456-426614174000'), [BlogTag.create(' Tag 1')], [BlogImage.create('https://example.com/resource')]),

    new Blog( BlogId.create('123e4567-e89b-12d3-a456-426614174001'), BlogTitle.create(' Blog 2'), BlogContent.create('Content 2'), BlogPublicationDate.create(new Date()), 
    [BlogCommentId.create('123e4567-e89b-12d3-a456-426614174001')], CategoryId.create('123e4567-e89b-12d3-a456-426614174001'), TrainerId.create('123e4567-e89b-12d3-a456-426614174001'), [BlogTag.create(' Tag 2')], [BlogImage.create('https://example.com/resource')]),

    new Blog( BlogId.create('123e4567-e89b-12d3-a456-426614174002'), BlogTitle.create(' Blog 3'), BlogContent.create('Content 3'), BlogPublicationDate.create(new Date()), 
    [BlogCommentId.create('123e4567-e89b-12d3-a456-426614174002')], CategoryId.create('123e4567-e89b-12d3-a456-426614174002'), TrainerId.create('123e4567-e89b-12d3-a456-426614174001'), [BlogTag.create(' Tag 3')], [BlogImage.create('https://example.com/resource')]),


]

export class BlogMockRepository implements IBlogRepository{
    async getAllBLogs(page?: number, perpage?: number, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>> {
       
        let domainBlogs = blogs;
       
        if (category){
            domainBlogs = domainBlogs.filter(blog => blog.Category.equals(CategoryId.create(category)));
        }

        if (trainer){
            domainBlogs = domainBlogs.filter(blog => blog.Trainer.equals(TrainerId.create(trainer)));
        }

        const filteredBlogs: Blog[] = [];
        if(filter && filter.length > 0){
            domainBlogs.forEach(blog => {
                if(blog.Tags.some(tag => tag.value.toLowerCase().includes(filter.toLowerCase()))){
                    filteredBlogs.push(blog);
                }
            });
            domainBlogs = filteredBlogs;
        }
        
        const blogsResponse = domainBlogs.slice(page * perpage, page * perpage + perpage)
        return Result.success(blogsResponse);
    }
    getBlogById(id: string): Promise<Result<Blog>> {
        throw new Error("Method not implemented.");
    }
    getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>> {
        throw new Error("Method not implemented.");
    }
    saveBlog(comment: Blog): Promise<Result<Blog>> {
        throw new Error("Method not implemented.");
    }
    findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>> {
        throw new Error("Method not implemented.");
    }
    saveComment(comment: CommentBlog): Promise<Result<CommentBlog>> {
        throw new Error("Method not implemented.");
    }
    getBlogsCount(category?: string, trainer?: string): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }

}