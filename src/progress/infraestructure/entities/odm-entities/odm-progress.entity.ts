import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";

@Schema({collection: 'progress'})
export class OdmProgressEntity {
    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    user: OdmUserEntity;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    lesson: OdmLessonEntity;

    @Prop({required: true})
    markAsCompleted: boolean;

    @Prop({required: true})
    time: number;

    @Prop({required: true})
    phone: string;

    @Prop({required: true, type: Date})
    lastTime: Date;

    @Prop({required: false})
    image?: string;
}

export const ProgressSchema = SchemaFactory.createForClass(OdmProgressEntity);