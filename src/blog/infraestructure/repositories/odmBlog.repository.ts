import { Blog } from "src/blog/domain/Blog";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { Result } from "src/common/domain/result-handler/result";
import { OdmBlogEntity } from '../entities/odm-entities/odm-blog.entity';
import { Model } from "mongoose";
import { OdmBlogMapper } from "../mapper/odmBlog.mapper";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { OdmBlogCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.blog.entity";
import { CommentsBlogNotFoundException } from "src/comment/domain/exceptions/blog/comments-blog-not-found-exception";
import { OdmBlogCommentMapper } from "../mapper/odm-comment-blog.mapper";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { BlogNotFoundException } from "src/blog/domain/exceptions/blog-not-found.exception";


export class OdmBlogRepository implements IBlogRepository{
    
    constructor(
        private odmBlogMapper: OdmBlogMapper, 
        private blogModel: Model<OdmBlogEntity >,
        private commentModel: Model<OdmBlogCommentEntity>,
        private userModel: Model<OdmUserEntity>,
        private trainerModel: Model<OdmTrainerEntity>,
        private odmCommentMapper: OdmBlogCommentMapper
    ) {}
   async  getBlogsCount(category?: string, trainer?: string): Promise<Result<number>> {
       try {
        const blogs = await this.blogModel.find();
        if(!blogs) return Result.fail(new BlogNotFoundException(`No se puede conseguir el conteo de Blogs, ya que no existen blogs`));
        let domainBlogs: Blog[] = [];

            for (const blog of blogs) {
                domainBlogs.push(await this.odmBlogMapper.toDomain(blog))
            }

    
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

   async  getAllBLogs(page: number=0, perpage: number=5, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>> {
        try {
            const blogs = await this.blogModel.find();
            if(!blogs) return Result.fail(new BlogNotFoundException(`No hay existencia de blogs`));
            let domainBlogs: Blog[] = [];

            for (const blog of blogs) {
                domainBlogs.push(await this.odmBlogMapper.toDomain(blog))
            }

        
        if (category){
            domainBlogs = domainBlogs.filter(blog => blog.Category.equals(CategoryId.create(category)));
        }

        if (trainer){
            domainBlogs = domainBlogs.filter(blog => blog.Trainer.equals(TrainerId.create(trainer)));
        }

        const filteredBlogs: Blog[] = [];
        // if(filter && filter.length > 0){
        //     domainBlogs.forEach(blog => {
        //         if(blog.Tags.some(tag => tag.value.toLowerCase().includes(filter.toLowerCase()))){
        //             filteredBlogs.push(blog);
        //         }
        //     });
        //     domainBlogs = filteredBlogs;
        // }

        const blogsResponse = domainBlogs.slice(page * perpage, page * perpage + perpage)
        return Result.success(blogsResponse);

       } catch (error) {
            return Result.fail(new BlogNotFoundException(`No hay existencia de blogs`)); 
        }
    }
   async getBlogById(id: string): Promise<Result<Blog>> {
       try {
        const blog = await this.blogModel.findOne({id: id});
        if(!blog) return Result.fail(new Error(`Blog with id= ${id} not found`));   
        const domainBlog =  await this.odmBlogMapper.toDomain(blog);
        return Result.success(domainBlog);
       } catch (error) {
            return Result.fail(error); 
    }
    }

    async getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>> {
        try{
            const resp = await this.blogModel.find({tag_id: {$in: tagsName}});
            if(!resp) return Result.fail(new BlogNotFoundException(`No existen Blogs con el tag: ${tagsName}`));
            const domainBlogs: Blog[] = [];

            for (const blog of resp) {
                domainBlogs.push(await this.odmBlogMapper.toDomain(blog))
            }
            return Result.success(domainBlogs);   
        } catch (error) {
            return Result.fail(error);
            
        }
    
    }

    async findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>> {
        try{
            const r = await this.commentModel.find<OdmBlogCommentEntity>();

            const comment = r.filter(e => e.blog.id === id.BlogId.value);

            const ListMapper = []
            comment.forEach(async e => {
                ListMapper.push( 
                    await this.odmCommentMapper.toDomain(e ))
            });
        
            
            return Result.success<CommentBlog[]>(ListMapper);
        }catch(err){
            return Result.fail(new CommentsBlogNotFoundException(`Ha ocurrido un error al encontrar los comentarios`));
        }
    }

    async saveComment (comment: CommentBlog): Promise<Result<CommentBlog>>{ 
        this.odmCommentMapper = new OdmBlogCommentMapper(this.userModel, this.blogModel, this.commentModel, this.trainerModel)
        const odmComment = await this.odmCommentMapper.toPersistence(comment);
        // console.log(odmComment); //Debug
        
        await this.commentModel.create(odmComment);
        
        return Result.success<CommentBlog>(comment);
    }

    async saveBlog(blog: Blog): Promise<Result<Blog>>{ 
        //const odmBlog = await this.odmBlogMapper.toPersistence(blog);
        //let comment = comments.map(e => e.commentId);
        //await this.commentModel.create(odmBlog);
        return Result.success<Blog>(blog);
    }
}