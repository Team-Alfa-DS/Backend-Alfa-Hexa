import { CommentBlog } from "src/comment/domain/comment-blog";
import { OdmBlogCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.blog.entity";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogPublicationDate } from "src/comment/domain/valueObjects/blog/comment-blog-publicationDate";
import { CommentBlogBody } from "src/comment/domain/valueObjects/blog/comment-blog-body";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlogUserLiked } from "src/comment/domain/valueObjects/blog/comment-blog-userLiked";
import { CommentBlogUserDisliked } from "src/comment/domain/valueObjects/blog/comment-blog-userDisliked";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { OdmUserMapper } from "src/user/infraestructure/mappers/odm-mappers/odm-user.mapper";
import { Model } from "mongoose";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { OdmUserRespository } from "src/user/infraestructure/repositories/odm-user.repository";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmBlogRepository } from "src/blog/infraestructure/repositories/odmBlog.repository";
import { OdmBlogMapper } from "src/blog/infraestructure/mapper/odmBlog.mapper";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { find } from 'rxjs';


export class OdmBlogCommentMapper implements IMapper<CommentBlog,OdmBlogCommentEntity>{

    private readonly userModel: Model<OdmUserEntity>;
    private readonly blogModel: Model<OdmBlogEntity>;
    private readonly commentModel: Model<OdmBlogCommentEntity>;
    private readonly trainerModel: Model<OdmTrainerEntity>

    constructor(
        userModel: Model<OdmUserEntity>,
        blogModel: Model<OdmBlogEntity>,
        commentModel: Model<OdmBlogCommentEntity>,
        trainerModel: Model<OdmTrainerEntity>
    ){
        this.userModel = userModel;
        this.blogModel = blogModel;
        this.commentModel = commentModel;
        this.trainerModel = trainerModel;
    }
    
    async toDomain(OdmEntity: OdmBlogCommentEntity): Promise<CommentBlog> {
        const domainComment = CommentBlog.create(
            BlogCommentId.create(OdmEntity.id),
            CommentBlogPublicationDate.create(OdmEntity.publication_date),
            CommentBlogBody.create(OdmEntity.body),
            CommentBlogUserId.create(OdmEntity.user.id),
            BlogCommentBlogId.create(BlogId.create(OdmEntity.blog.id)),
            CommentBlogUserLiked.create(OdmEntity.userLiked),
            CommentBlogUserDisliked.create(OdmEntity.userDisliked),
        )
        return domainComment;
    }

    async toPersistence(Domain: CommentBlog): Promise<OdmBlogCommentEntity> {
        let odmUserMapper = new OdmUserMapper();
        let odmBlogMapper = new OdmBlogMapper(this.userModel,this.blogModel,this.commentModel, this.trainerModel);

        let userRepo: OdmUserRespository = new OdmUserRespository(odmUserMapper, this.userModel);
        let blogRepo = new OdmBlogRepository(odmBlogMapper, this.blogModel, this.commentModel, this.userModel, this.trainerModel);
        
        let user = await userRepo.findUserById(UserId.create(Domain.UserId.UserId));

        let userPersistence = await odmUserMapper.toPersistence(user.Value);

        // const blog = await this.blogModel.aggregate<OdmBlogEntity>([
        //     {
        //         $match: {
        //             'id': Domain.BlogId.BlogId
        //         }
        //     }
        // ]);
        const blog = await this.blogModel.findOne<OdmBlogEntity>({id: Domain.BlogId.BlogId.value});

        const OrmComment = OdmBlogCommentEntity.create(
            Domain.Id.commentId,
            Domain.PublicationDate.PublicationDate,
            Domain.Body.Body,
            blog,
            userPersistence
        )

        // const OrmComment = OdmBlogCommentEntity.create(
        //     Domain.Id.commentId,
        //     Domain.PublicationDate.PublicationDate,
        //     Domain.Body.Body,
        //     blog,
        //     userPersistence,
        //     // Domain.UserLiked.UserLiked,
        //     // Domain.UserDisliked.UserDisliked
        // );
        return Promise.resolve(OrmComment);
    }
}