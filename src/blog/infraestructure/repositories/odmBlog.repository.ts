import { Blog } from "src/blog/domain/Blog";
import { IBlogCommandRepository } from "src/blog/domain/repositories/IBlogCommand.repository";
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
import { IBlogQueryRepository } from "src/blog/domain/repositories/IBlogQuery.repository";


export class OdmBlogRepository implements IBlogQueryRepository{
    
    private odmCommentMapper: OdmBlogCommentMapper;
    
    constructor(
        private odmBlogMapper: OdmBlogMapper, 
        private blogModel: Model<OdmBlogEntity >,
        private commentModel: Model<OdmBlogCommentEntity>,
        private userModel: Model<OdmUserEntity>,
        private trainerModel: Model<OdmTrainerEntity>
    ) {}
   async  getBlogsCount(category?: string, trainer?: string): Promise<Result<number>> {
        const blogs = await this.blogModel.find();
        // if(!blogs) return Result.fail(new BlogNotFoundException(`No se puede conseguir el conteo de Blogs, ya que no existen blogs`));
        if (!blogs) {throw new BlogNotFoundException(`No se puede conseguir el conteo de Blogs, ya que no existen blogs`)}
        let domainBlogs = blogs.map(blog => OdmBlogMapper.toDomain(blog));


        if (category){
            domainBlogs = domainBlogs.filter(blog => blog.Category.equals(CategoryId.create(category)));
        }

        if (trainer){
            domainBlogs = domainBlogs.filter(blog => blog.Trainer.equals(TrainerId.create(trainer)));
        }

        return Result.success(domainBlogs.length);

    }

   async  getAllBLogs(page: number=0, perpage: number=5, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>> {
        const blogs = await this.blogModel.find();
        // if(!blogs) return Result.fail(new BlogNotFoundException(`No hay existencia de blogs`));
        if (!blogs) throw new BlogNotFoundException(`No hay existencia de blogs`)
        let domainBlogs = blogs.map(blog => OdmBlogMapper.toDomain(blog));


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

   async getBlogById(id: string): Promise<Result<Blog>> {
        const blog = await this.blogModel.findOne({id: id});
        // if(!blog) return Result.fail(new Error(`Blog with id= ${id} not found`));   
        if (!blog) {throw new BlogNotFoundException(`Blog with id= ${id} not found`)}
        const domainBlog =  OdmBlogMapper.toDomain(blog);
        return Result.success(domainBlog);
    }

    async getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>> {
        const resp = await this.blogModel.find({tag_id: {$in: tagsName}});
        // if(!resp) return Result.fail(new BlogNotFoundException(`No existen Blogs con el tag: ${tagsName}`));
        if (!resp) {throw new BlogNotFoundException(`No existen Blogs con el tag: ${tagsName}`)}
        const domainBlogs = resp.map(blog => OdmBlogMapper.toDomain(blog));
        return Result.success(domainBlogs);   
    
    }

    async findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>> {
        const r = await this.commentModel.find<OdmBlogCommentEntity>();

        const comment = r.filter(e => e.blog.id === id.BlogId.value);

        const ListMapper = []
        comment.forEach(async e => {
            ListMapper.push( 
                await this.odmCommentMapper.toDomain(e ))
        });
    
        
        return Result.success<CommentBlog[]>(ListMapper);
    }

    async saveComment (comment: CommentBlog): Promise<Result<CommentBlog>>{ 
        this.odmCommentMapper = new OdmBlogCommentMapper(this.userModel, this.blogModel, this.commentModel, this.trainerModel)
        const odmComment = await this.odmCommentMapper.toPersistence(comment);
        
        
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