import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Types } from "mongoose";
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

    @Prop({required: true, type: Date})
    lastTime: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(OdmProgressEntity);