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
    blog: OdmBlogCommentEntity;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    user: OdmUserEntity;
}

export const BlogCommentSchema = SchemaFactory.createForClass(OdmBlogCommentEntity);