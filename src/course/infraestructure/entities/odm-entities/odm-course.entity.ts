import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Types } from "mongoose";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";

@Schema({collection: 'course'})
export class OdmCourseEntity {
    @Prop({required: true, unique: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    image: string;

    @Prop({required: true, type: Date})
    publication_date: Date;

    @Prop({required: true})
    minutes: number;

    @Prop({required: true})
    weeks: number;

    @Prop({required: true})
    level: string;

    @Prop({required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'lesson'}]})
    @Type(() => OdmLessonEntity)
    lessons: OdmLessonEntity;

    @Prop({required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'tag'}]})
    @Type(() => OdmTagEntity)
    tags: OdmTagEntity;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'category'})
    @Type(() => OdmCategoryEntity)
    category: OdmCategoryEntity;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'trainer'})
    @Type(() => OdmTrainerEntity)
    trainer: OdmTrainerEntity;
}

export const CourseSchema = SchemaFactory.createForClass(OdmCourseEntity);