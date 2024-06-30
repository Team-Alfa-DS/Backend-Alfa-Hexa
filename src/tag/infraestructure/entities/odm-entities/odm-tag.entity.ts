import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({collection: 'tag'})
export class OdmTagEntity {
    @Prop({required: true, unique: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    name: string;
}

export const TagSchema = SchemaFactory.createForClass(OdmTagEntity);