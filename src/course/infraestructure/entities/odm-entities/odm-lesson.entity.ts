import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({collection: 'lesson'})
export class OdmLessonEntity {
    @Prop({required: true, unique: true, type: Types.UUID})
    user: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    seconds: number;

    @Prop({required: true})
    video: string;
}

export const LessonSchema = SchemaFactory.createForClass(OdmLessonEntity);