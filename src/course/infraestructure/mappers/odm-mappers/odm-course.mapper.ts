import { Course } from "src/course/domain/Course";
import { OdmCourseEntity } from "../../entities/odm-entities/odm-course.entity";
import { Lesson } from "src/course/domain/entities/Lesson";
import { OdmLessonMapper } from "./odm-lesson.mapper";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { CourseTitle } from "src/course/domain/value-objects/course-title";
import { CourseDescription } from "src/course/domain/value-objects/course-description";
import { CourseImage } from "src/course/domain/value-objects/course-image";
import { CourseDurationMinutes } from "src/course/domain/value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "src/course/domain/value-objects/course-durationWeeks";
import { CourseLevel } from "src/course/domain/value-objects/course-level";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { Model } from "mongoose";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";

export class OdmCourseMapper {
  static async toDomain(entity: OdmCourseEntity): Promise<Course> {
    const domainLessons: Lesson[] = [];
    for( let lesson of entity.lessons ) {
      domainLessons.push(await OdmLessonMapper.toDomain(lesson));
    }
    const domainTags: CourseTag[] = [];
    for (let tag of entity.tags) {
      domainTags.push(new CourseTag(tag.name));
    }
    return Course.create(
      new CourseId(entity.id),
      new CourseTitle(entity.name),
      new CourseDescription(entity.description),
      new CourseImage(entity.image),
      entity.publication_date,
      new CourseDurationMinutes(entity.minutes),
      new CourseDurationWeeks(entity.weeks),
      new CourseLevel(entity.level),
      domainLessons,
      domainTags,
      new CourseCategory(entity.category.id),
      new CourseTrainer(entity.trainer.id)
    );
  }

  static async arrayToDomain(entities: OdmCourseEntity[]): Promise<Course[]> {
    const courses: Course[] = [];
      for (let entity of entities) {
        courses.push(await OdmCourseMapper.toDomain(entity));
      }
    return courses;
  }

  static async toPersistence(domainCourse: Course, categoryModel: Model<OdmCategoryEntity>, trainerModel: Model<OdmTrainerEntity>, tagModel: Model<OdmTagEntity>): Promise<OdmCourseEntity> {
    const category = await categoryModel.findOne<OdmCategoryEntity>({id: domainCourse.Category.value.value});
    const trainer = await trainerModel.findOne<OdmTrainerEntity>({id: domainCourse.Trainer.value.trainerId});
    const tags: OdmTagEntity[] = []; let tagEntity: OdmTagEntity;
    for (let tag of domainCourse.Tags) {
      tagEntity = await tagModel.findOne({name: tag.name});
      tags.push(tagEntity);
    }
    return OdmCourseEntity.create(
      domainCourse.Id.Value,
      domainCourse.Title.value,
      domainCourse.Description.value,
      domainCourse.Date,
      domainCourse.DurationMinutes.value,
      domainCourse.DurationWeeks.value,
      domainCourse.Level.value,
      domainCourse.Image.Value,
      tags,
      category,
      trainer
    );
    // return odmCourse; //FIXME: No está implementado
  }
}