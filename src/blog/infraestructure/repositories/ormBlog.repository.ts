import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { DataSource, Repository } from "typeorm";
import { BlogEntity } from "../entities/blog.entity";
import { Blog } from "src/blog/domain/Blog";
import { BlogMapper } from '../mapper/blog.mapper';

export class OrmBlogRepository extends Repository<BlogEntity> implements IBlogRepository {

    constructor(dataBase: DataSource) {
        super(BlogEntity, dataBase.manager);
    }


    async getAllBLogs(): Promise<Blog[]> {
       try {
        const resp = await this.createQueryBuilder('blog')
        .leftJoinAndSelect('blog.trainer', 'trainer')
        .leftJoinAndSelect('blog.category', 'category')
        .leftJoinAndSelect('blog.tags', 'tags')
        .leftJoinAndSelect('blog.images', 'images')
        .leftJoinAndSelect('blog.comments', 'comments')
        .getMany();
        return resp.map(blog => BlogMapper.toDomain(blog));
       } catch (error) {
        console.log(error);
        throw new Error("Blogs not found"); 
       }
    }


   async  getBlogById(id: string): Promise<Blog> {
        try {
            const blog = await this.createQueryBuilder('blog')
            .leftJoinAndSelect('blog.trainer', 'trainer')
            .leftJoinAndSelect('blog.category', 'category')
            .leftJoinAndSelect('blog.tags', 'tags')
            .leftJoinAndSelect('blog.images', 'images')
            .leftJoinAndSelect('blog.comments', 'comments')
            .where('blog.id = :id', {id})
            .getOne();
            return BlogMapper.toDomain(blog);
           } catch (error) {
            console.log(error);
            throw new Error(`Blog with id= ${id} not found`); 
           }
    }
}
