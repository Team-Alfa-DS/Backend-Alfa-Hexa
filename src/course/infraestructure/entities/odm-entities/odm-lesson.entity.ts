import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({collection: 'lesson'})
export class OdmLessonEntity {
    @Prop({required: true, unique: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    seconds: number;

    @Prop({required: true})
    video: string;

    static create(
        id: string,
        title: string,
        content: string,
        seconds: number,
        video: string,
      ): OdmLessonEntity {
        const odmLesson = new OdmLessonEntity();
        odmLesson.id = id;
        odmLesson.title = title;
        odmLesson.content = content;
        odmLesson.seconds = seconds;
        odmLesson.video = video;
    
        return odmLesson;
      }
}

export const LessonSchema = SchemaFactory.createForClass(OdmLessonEntity);