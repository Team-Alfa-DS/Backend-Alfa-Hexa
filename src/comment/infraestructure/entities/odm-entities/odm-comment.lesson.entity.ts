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

    // @Prop({required: false})
    // userLiked?: boolean;

    // @Prop({required: false})
    // userDisliked?: boolean;

    @Prop({required: true})
    body: string;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    lesson: OdmLessonEntity;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    user: OdmUserEntity;
    
    
    static create(
        id: string, 
        publication_date: Date, 
        body: string, 
        lesson: OdmLessonEntity, 
        user: OdmUserEntity,
        // userLiked?: boolean,
        // userDisliked?: boolean
    ) {
        const odmCommentLesson = new OdmLessonCommentEntity();
        odmCommentLesson.id = id;
        odmCommentLesson.publication_date = publication_date;
        odmCommentLesson.body = body;
        odmCommentLesson.lesson = lesson;
        odmCommentLesson.user = user;
        // odmCommentLesson.userLiked = userLiked;
        // odmCommentLesson.userDisliked = userDisliked;
        return odmCommentLesson; 
    }

}


export const LessonCommentSchema = SchemaFactory.createForClass(OdmLessonCommentEntity);