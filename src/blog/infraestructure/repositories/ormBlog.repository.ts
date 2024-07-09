import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { DataSource, Repository } from "typeorm";
import { OrmBlogEntity } from "../entities/orm-entities/orm-blog.entity";
import { Blog } from "src/blog/domain/Blog";
import { BlogMapper } from '../mapper/blog.mapper';
import { Result } from '../../../common/domain/result-handler/result';
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { BlogTag } from "src/blog/domain/valueObjects/blogTag";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";

export class OrmBlogRepository extends Repository<OrmBlogEntity> implements IBlogRepository {

    constructor(dataBase: DataSource) {
        super(OrmBlogEntity, dataBase.manager);
    }
    findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>> {
        throw new Error("Method not implemented.");
    }

    async getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>> {
        try {
            const resp = await this.createQueryBuilder('blog')
            .leftJoinAndSelect('blog.trainer', 'trainer')
            .leftJoinAndSelect('blog.category', 'category')
            .leftJoinAndSelect('blog.tags', 'tags')
            .leftJoinAndSelect('blog.images', 'images')
            .leftJoinAndSelect('blog.comments', 'comments')
            .where('LOWER(tags.name) IN (:...tagsName)', { tagsName: tagsName.map(tag => tag.toLowerCase()) })	
            .getMany();
            if(!resp) return Result.fail(new Error(`Blogs with tags: ${tagsName} not found`));
            const domainBlogs = resp.map(blog => BlogMapper.toDomain(blog));
            return Result.success(domainBlogs);   
        } catch (error) {
            console.log(error);
            return Result.fail(error);
            
        }
    }


    async getAllBLogs(page: number=0, perpage: number=5, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>> {
    try {
        const resp = await this.createQueryBuilder('blog')
        .leftJoinAndSelect('blog.trainer', 'trainer')
        .leftJoinAndSelect('blog.category', 'category')
        .leftJoinAndSelect('blog.tags', 'tags')
        .leftJoinAndSelect('blog.images', 'images')
        .leftJoinAndSelect('blog.comments', 'comments')
        .getMany();
        if(!resp) return Result.fail(new Error('Blogs not found'));
        let domainBlogs = resp.map(blog => BlogMapper.toDomain(blog));
        
        
        if (category){
            domainBlogs = domainBlogs.filter(blog => blog.Category.equals(CategoryId.create(category)));
        }

        if (trainer){
            domainBlogs = domainBlogs.filter(blog => blog.Trainer.equals(TrainerId.create(trainer)));
        }

        const filteredBlogs: Blog[] = [];
        if(filter && filter.length > 0){
            domainBlogs = domainBlogs.filter(blog => blog.Tag.value.toLowerCase().includes(filter.toLowerCase()));
        }

        const blogsResponse = domainBlogs.slice(page * perpage, page * perpage + perpage)
        return Result.success(blogsResponse);

    } catch (error) {
            console.log(error);
            return Result.fail(error); 
    }
    }


    async  getBlogById(id: string): Promise<Result<Blog>> {
        try {
            const blog = await this.createQueryBuilder('blog')
            .leftJoinAndSelect('blog.trainer', 'trainer')
            .leftJoinAndSelect('blog.category', 'category')
            .leftJoinAndSelect('blog.tags', 'tags')
            .leftJoinAndSelect('blog.images', 'images')
            .leftJoinAndSelect('blog.comments', 'comments')
            .where('blog.id = :id', {id})
            .getOne();
            if(!blog) return Result.fail(new Error(`Blog with id= ${id} not found`));   
            const domainBlog =  BlogMapper.toDomain(blog);
            return Result.success(domainBlog);
           } catch (error) {
                console.log(error);
                return Result.fail(error); 
           }
    }
}
