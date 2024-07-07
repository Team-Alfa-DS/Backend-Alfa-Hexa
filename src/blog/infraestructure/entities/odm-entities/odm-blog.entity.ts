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
    publication_date: Date;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'category'})
    @Type(() => OdmCategoryEntity)
    category: OdmCategoryEntity;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'trainer'})
    @Type(() => OdmTrainerEntity)
    trainer: OdmTrainerEntity;

    @Prop({required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'tag'}]})
    @Type(() => OdmTagEntity)
    tags: OdmTagEntity;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'image'}]})
    @Type(() => OdmImageEntity)
    images: OdmImageEntity;
}

export const BlogSchema = SchemaFactory.createForClass(OdmBlogEntity);