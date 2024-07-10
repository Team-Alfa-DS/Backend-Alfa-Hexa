import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";

@Schema({collection: 'blog_comment'})
export class OdmBlogCommentEntity {
    @Prop({required: true, type: Types.UUID})
    id: string;

    @Prop({required: true, type: Date})
    publication_date: Date;

    @Prop({required: false})
    userLiked?: boolean;

    @Prop({required: false})
    userDisliked?: boolean;

    @Prop({required: true})
    body: string;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    blog: OdmBlogEntity;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    user: OdmUserEntity;
    
    
    static create(
        id: string, 
        publication_date: Date, 
        body: string, 
        blog: OdmBlogEntity, 
        user: OdmUserEntity,
        // userLiked?: boolean,
        // userDisliked?: boolean
    ) {
        const odmCommentBlog = new OdmBlogCommentEntity();
        odmCommentBlog.id = id;
        odmCommentBlog.publication_date = publication_date;
        odmCommentBlog.body = body;
        odmCommentBlog.blog = blog;
        odmCommentBlog.user = user;
        // odmCommentBlog.userLiked = userLiked;
        // odmCommentBlog.userDisliked = userDisliked;
        // console.log(odmCommentBlog);
        
        return odmCommentBlog; 
    }
}



export const BlogCommentSchema = SchemaFactory.createForClass(OdmBlogCommentEntity);