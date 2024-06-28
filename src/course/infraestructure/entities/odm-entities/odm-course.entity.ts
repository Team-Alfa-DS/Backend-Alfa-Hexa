import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    image: string;

    @Prop({required: true, type: Date})
    date: Date;

    @Prop({required: true})
    durationMinutes: number;

    @Prop({required: true})
    durationWeeks: number;

    @Prop({required: true})
    level: string;

    @Prop({required: true, type: [mongoose.Schema.Types.Mixed]})
    lessons: OdmLessonEntity[];

    @Prop({required: true, type: [mongoose.Schema.Types.Mixed]})
    tags: OdmTagEntity[];

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    category: OdmCategoryEntity;

    @Prop({required: true, type: [mongoose.Schema.Types.Mixed]})
    trainer: OdmTrainerEntity;
}

export const CourseSchema = SchemaFactory.createForClass(OdmCourseEntity);