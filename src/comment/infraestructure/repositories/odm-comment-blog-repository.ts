import { Result } from "src/common/domain/result-handler/result";
import { Model } from "mongoose";
import { OdmBlogCommentEntity } from "../entities/odm-entities/odm-comment.blog.entity";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { IOdmBlogCommentRepository } from "src/comment/application/odm-comment-blog-repository-interface";
import { CommentsBlogNotFoundException } from "src/comment/domain/exceptions/blog/comments-blog-not-found-exception";
import { OdmBlogCommentMapper } from "src/blog/infraestructure/mapper/odm-comment-blog.mapper";

export class OdmBlogCommentRepository implements IOdmBlogCommentRepository{
    
    private odmCommentMapper: OdmBlogCommentMapper;
    private readonly commentModel: Model<OdmBlogCommentEntity>;

    constructor(commentModel: Model<OdmBlogCommentEntity>){
        this.commentModel = commentModel;
    }
    
    async findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>> {
        const r = await this.commentModel.find<OdmBlogCommentEntity>();
            
        // if (!r) return Result.fail<CommentBlog[]>(new CommentsBlogNotFoundException( 
        //     `Ha ocurrido un error al encontrar los comentarios` ));
        if (!r) { throw new CommentsBlogNotFoundException(`Ha ocurrido un error al encontrar los comentarios`) }
        const comment = r.filter(e => e.blog.id === id.BlogId.value);

        const ListMapper = []
        comment.forEach(async e => {
            ListMapper.push( 
                await this.odmCommentMapper.toDomain(e ))
        });
    
        
        return Result.success<CommentBlog[]>(ListMapper);
    }

}