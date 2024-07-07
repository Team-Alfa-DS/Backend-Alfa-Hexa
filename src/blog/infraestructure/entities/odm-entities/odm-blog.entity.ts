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

    @Prop({required: true, type: Types.UUID, ref: 'category'})
    category: string;

    @Prop({required: true, type: Types.UUID, ref: 'trainer'})
    trainer: string;

    @Prop({required: true, type: [{type: Types.UUID, ref: 'tag'}]})
    tags: string[];

    @Prop({type: [{type: Types.UUID, ref: 'image'}]})
    images: string[];
}

export const BlogSchema = SchemaFactory.createForClass(OdmBlogEntity);