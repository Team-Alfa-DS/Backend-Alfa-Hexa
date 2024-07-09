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
}

export const BlogSchema = SchemaFactory.createForClass(OdmBlogEntity);