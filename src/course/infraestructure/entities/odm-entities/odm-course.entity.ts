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

    @Prop({required: true, type: [{type: Types.UUID, ref: 'lesson'}]})
    lessons: string[];

    @Prop({required: true, type: [{type: Types.UUID, ref: 'tag'}]})
    tags: string[];

    @Prop({required: true, type: Types.UUID, ref: 'category'})
    category: string;

    @Prop({required: true, type: Types.UUID, ref: 'trainer'})
    trainer: string[];
}

export const CourseSchema = SchemaFactory.createForClass(OdmCourseEntity);