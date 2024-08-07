
import { Blog } from "src/blog/domain/Blog";
import { BlogContent } from "src/blog/domain/valueObjects/blogContent";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { BlogImage } from "src/blog/domain/valueObjects/blogImage";
import { BlogPublicationDate } from "src/blog/domain/valueObjects/blogPublicationDate";
import { BlogTag } from "src/blog/domain/valueObjects/blogTag";
import { BlogTitle } from "src/blog/domain/valueObjects/blogTitle";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { OdmBlogEntity } from "../entities/odm-entities/odm-blog.entity";
import { Model } from "mongoose";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { OdmBlogCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.blog.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { IMapper } from "src/common/application/mappers/mapper.interface";

export class OdmBlogMapper implements IMapper<Blog, OdmBlogEntity>{

    private readonly userModel: Model<OdmUserEntity>;
    private readonly blogModel: Model<OdmBlogEntity>;
    private readonly commentModel: Model<OdmBlogCommentEntity>;
    private readonly trainerModel: Model<OdmTrainerEntity>;

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


    async toPersistence(DomainEntity: Blog): Promise<OdmBlogEntity> {
        throw new Error("Method not implemented.");
    }

    async toDomain(blog: OdmBlogEntity): Promise<Blog> {
        return new Blog(
            BlogId.create(blog.id),
            BlogTitle.create(blog.title),
            BlogContent.create(blog.description),
            BlogPublicationDate.create(blog.publication_date),
            [],
            CategoryId.create(blog.category.id),
            TrainerId.create(blog.trainer.id),
            blog.tags.map((tag) => BlogTag.create(tag.name)),
            blog.images.map((image) => BlogImage.create(image.url))

        );
    }
    
}
