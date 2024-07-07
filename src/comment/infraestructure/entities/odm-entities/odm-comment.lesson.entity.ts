import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";

@Schema({collection: 'lesson_comment'})
export class OdmLessonCommentEntity {
    @Prop({required: true, type: Types.UUID})
    id: string;

    @Prop({required: true, type: Date})
    publication_date: Date;

    @Prop({required: false})
    userLiked?: boolean;

    @Prop({required: false})
    userDisliked?: boolean;

    @Prop({required: true})
    body: string;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    lesson: OdmLessonEntity;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    user: OdmUserEntity;
}

export const LessonCommentSchema = SchemaFactory.createForClass(OdmLessonCommentEntity);