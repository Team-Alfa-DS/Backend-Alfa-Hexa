import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Types } from "mongoose";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { OdmBlogEntity } from "./odm-blog.entity";

@Schema({collection: 'image'})
export class OdmImageEntity {
    @Prop({required: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    url: string;
}

export const ImageSchema = SchemaFactory.createForClass(OdmImageEntity);