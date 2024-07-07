import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Types } from "mongoose";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";

@Schema({collection: 'tag'})
export class OdmTagEntity {
    @Prop({required: true, unique: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({type: [{type: Types.UUID, ref: 'blog'}]})
    blogs: string[];
}

export const TagSchema = SchemaFactory.createForClass(OdmTagEntity);