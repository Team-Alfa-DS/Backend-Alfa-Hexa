import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({collection: 'category'})
export class OdmCategoryEntity {
    @Prop({required: true, unique: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    icon: string;
}

export const CategorySchema = SchemaFactory.createForClass(OdmCategoryEntity);