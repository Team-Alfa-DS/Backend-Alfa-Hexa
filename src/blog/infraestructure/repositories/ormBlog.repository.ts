import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { DataSource, Repository } from "typeorm";
import { BlogEntity } from "../entities/blog.entity";
import { Blog } from "src/blog/domain/Blog";
import { BlogMapper } from '../mapper/blog.mapper';
import { Result } from '../../../common/domain/result-handler/result';

export class OrmBlogRepository extends Repository<BlogEntity> implements IBlogRepository {

    constructor(dataBase: DataSource) {
        super(BlogEntity, dataBase.manager);
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
            if(!resp) return Result.fail(new Error(`Blogs with tags: ${tagsName} not found`), 404, `Blogs with tags: ${tagsName} not found`);
            const domainBlogs = resp.map(blog => BlogMapper.toDomain(blog));
            return Result.success(domainBlogs, 200);   
        } catch (error) {
            console.log(error);
            return Result.fail(error, 500, `Error getting blogs with tags: ${tagsName}`);
            
        }
    }


    async getAllBLogs(): Promise<Result<Blog[]>> {
       try {
        const resp = await this.createQueryBuilder('blog')
        .leftJoinAndSelect('blog.trainer', 'trainer')
        .leftJoinAndSelect('blog.category', 'category')
        .leftJoinAndSelect('blog.tags', 'tags')
        .leftJoinAndSelect('blog.images', 'images')
        .leftJoinAndSelect('blog.comments', 'comments')
        .getMany();
        if(!resp) return Result.fail(new Error('Blogs not found'), 404, 'Blogs not found');
        const domainBlogs = resp.map(blog => BlogMapper.toDomain(blog));
        return Result.success(domainBlogs, 200);

       } catch (error) {
            console.log(error);
            return Result.fail(error, 500, 'Error getting blogs'); 
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
            if(!blog) return Result.fail(new Error(`Blog with id= ${id} not found`), 404, `Blog with id= ${id} not found`);   
            const domainBlog =  BlogMapper.toDomain(blog);
            return Result.success(domainBlog, 200);
           } catch (error) {
                console.log(error);
                return Result.fail(error, 500, `Error getting blog with id= ${id}`); 
           }
    }
}
