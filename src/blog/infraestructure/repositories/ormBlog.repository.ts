import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { DataSource, Repository } from "typeorm";
import { OrmBlogEntity } from "../entities/orm-entities/orm-blog.entity";
import { Blog } from "src/blog/domain/Blog";
import { BlogMapper } from '../mapper/blog.mapper';
import { Result } from '../../../common/domain/result-handler/result';
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { OrmBlogCommentMapper } from "../mapper/orm-comment-blog.mapper";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { BlogNotFoundException } from "src/blog/domain/exceptions/blog-not-found.exception";

export class OrmBlogRepository extends Repository<OrmBlogEntity> implements IBlogRepository {

    constructor(dataBase: DataSource) {
        super(OrmBlogEntity, dataBase.manager);
    }
   async  getBlogsCount(category?: string, trainer?: string): Promise<Result<number>> {
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
        return Result.success(domainBlogs.length);
       } catch (error) {
            return Result.fail(error);
       }
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
            if(!resp) return Result.fail(new BlogNotFoundException(`No se encuentran los Blogs con los tags: ${tagsName}`));
            const domainBlogs = resp.map(blog => BlogMapper.toDomain(blog));
            return Result.success(domainBlogs);   
        } catch (error) {
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
        if(!resp) return Result.fail(new BlogNotFoundException(`No se encuentran los Blogs`));
        let domainBlogs = resp.map(blog => BlogMapper.toDomain(blog));
        
        
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

       } catch (error) {
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
            if(!blog) return Result.fail(new BlogNotFoundException(`Blog with id= ${id} not found`));   
            const domainBlog =  BlogMapper.toDomain(blog);
            return Result.success(domainBlog);
           } catch (error) {
                return Result.fail(new BlogNotFoundException(`Hubo un error al buscar el blog con id= ${id}`)); 
        }
    }

    async findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>> {
        try{
            const ormCommentMapper = new OrmBlogCommentMapper();
            const blog = await this.createQueryBuilder('blog')
            .leftJoinAndSelect('blog.trainer', 'trainer')
            .leftJoinAndSelect('blog.category', 'category')
            .leftJoinAndSelect('blog.tags', 'tags')
            .leftJoinAndSelect('blog.images', 'images')
            .leftJoinAndSelect('blog.comments', 'comments')
            .where('blog.id = :id', {id})
            .getOne();

            let commentsFound = blog.comments;

            const ListMapper = []
            commentsFound.forEach(async e => { 
            ListMapper.push( 
                await ormCommentMapper.toDomain(e ))  
        });

        }catch(error){
            return Result.fail(error);
        }    
    };

    async saveComment(comment: CommentBlog): Promise<Result<CommentBlog>> {
        try{            
            const ormCommentMapper = new OrmBlogCommentMapper();
            const runnerTransaction = PgDatabaseSingleton.getInstance().createQueryRunner();
            const ormComment = await ormCommentMapper.toPersistence(comment);
            await runnerTransaction.manager.save(ormComment);
            // console.log(ormComment);
            
            return Result.success<CommentBlog>(comment);                                                    
        }catch(err){
            return Result.fail<CommentBlog>(new Error(err.message));
        }

    };

    async saveBlog(blog: Blog): Promise<Result<Blog>>{
        const runnerTransaction = PgDatabaseSingleton.getInstance().createQueryRunner();
        const ormBlogEntity = await BlogMapper.toPersistence(blog);
        
        await runnerTransaction.manager.save(ormBlogEntity);
        return Result.success<Blog>(blog);
    }

}
