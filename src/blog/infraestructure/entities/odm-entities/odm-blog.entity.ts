import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { OdmImageEntity } from "./odm-image.entity";
import { Type } from "class-transformer";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";

@Schema({collection: 'blog'})
export class OdmBlogEntity {
    @Prop({required: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true, type: Date})
    date: Date;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    category_id: string;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    trainer_id: string;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    tag_id: string;

    @Prop({type: [{type: mongoose.Schema.Types.Mixed}]})
    images: string[];

    @Prop({type: [{type: mongoose.Schema.Types.Mixed}]})
    comments: string[];
    
    
    static create(
        id: string,
        title: string,
        description: string,
        date: Date,
        category_id: string,
        trainer_id: string,
        tag_id: string,
        images: string[],
        comments: string[]
    ){
        const odmBlog = new OdmBlogEntity();
        odmBlog.id = id;
        odmBlog.title = title;
        odmBlog.description = description;
        odmBlog.date = date;
        odmBlog.category_id = category_id
        odmBlog.trainer_id = trainer_id;
        odmBlog.tag_id = tag_id;
        odmBlog.images = images;
        odmBlog.comments = comments;
        return odmBlog;
    }

}


export const BlogSchema = SchemaFactory.createForClass(OdmBlogEntity);