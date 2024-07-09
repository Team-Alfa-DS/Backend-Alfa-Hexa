import { LessonCommentId } from "src/comment/domain/valueObjects/lesson/comment-lesson-id";
import { CommentLessonUserDisliked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userDisliked";
import { CommentLessonUserLiked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userLiked";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { CommentLessonUserId } from "src/comment/domain/valueObjects/lesson/comment-lesson-userId";
import { CommentLessonBody } from "src/comment/domain/valueObjects/lesson/comment-lesson-body";
import { CommentLessonPublicationDate } from "src/comment/domain/valueObjects/lesson/comment-lesson-publicationDate";
import { OdmLessonCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { OdmUserRespository } from "src/user/infraestructure/repositories/odm-user.repository";
import { OdmUserMapper } from "src/user/infraestructure/mappers/odm-mappers/odm-user.mapper";
import { Model } from "mongoose";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmCourseMapper } from "src/course/infraestructure/mappers/odm-mappers/odm-course.mapper";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { OdmCourseRepository } from "src/course/infraestructure/repositories/OdmCourse.repository";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { OdmLessonMapper } from "src/course/infraestructure/mappers/odm-mappers/odm-lesson.mapper";
import { CommentLesson } from "src/course/domain/entities/comment-lesson";


export class OdmLessonCommentMapper {

    static async toDomain(OdmEntity: OdmLessonCommentEntity): Promise<CommentLesson> {
        const domainComment = CommentLesson.create(
            LessonCommentId.create(OdmEntity.id),
            CommentLessonPublicationDate.create(OdmEntity.publication_date),
            CommentLessonBody.create(OdmEntity.body),
            CommentLessonUserId.create(OdmEntity.user.id),
            LessonCommentLessonId.create(LessonId.create(OdmEntity.lesson.id)),
            // CommentLessonUserLiked.create(OdmEntity.userLiked),
            // CommentLessonUserDisliked.create(OdmEntity.userDisliked),
        )
        return domainComment;
    }

    static async arrayToDomain(entities: OdmLessonCommentEntity[]): Promise<CommentLesson[]> {
        const comments: CommentLesson[] = [];

        for (let comment of entities) {
            comments.push(await OdmLessonCommentMapper.toDomain(comment));
        }

        return comments;
    }

    static async toPersistence(lessonComment: CommentLesson, userModel: Model<OdmUserEntity>, lessonModel: Model<OdmLessonEntity>): Promise<OdmLessonCommentEntity> {
        const user = await userModel.findOne<OdmUserEntity>({id: lessonComment.UserId.UserId})
        const lesson = await lessonModel.findOne<OdmLessonEntity>({id: lessonComment.LessonId.LessonId.Value})

        return OdmLessonCommentEntity.create(
            lessonComment.Id.commentId,
            lessonComment.PublicationDate.PublicationDate,
            lessonComment.Body.Body,
            lesson,
            user,
        );

    }

    // async toPersistence(Domain: CommentLesson): Promise<OdmLessonCommentEntity> {
    //     let odmUserMapper = new OdmUserMapper();

    //     let userModel = new Model<OdmUserEntity>;
    //     // let courseModel = new Model<OdmCourseEntity>;
    //     // let categoryModel = new Model<OdmCategoryEntity>;
    //     // let trainerModel = new Model<OdmTrainerEntity>;
    //     // let tagModel = new Model<OdmTagEntity>;
    //     let lessonModel = new Model<OdmLessonEntity>;
    //     // let commentModel = new Model<OdmLessonCommentEntity>

    //     const user = userModel.
    //     // let userRepo: OdmUserRespository = new OdmUserRespository(odmUserMapper, userModel)
    //     // let courseRepo: OdmCourseRepository = new OdmCourseRepository( courseModel, categoryModel, trainerModel, tagModel, lessonModel,commentModel)
        
    //     // let user = await userRepo.findUserById(UserId.create(Domain.UserId.UserId));
    //     // let course = await courseRepo.getCourseByLessonId(Domain.LessonId.LessonId);

    //     // let lesson = course.Lessons.find(lesson => Domain.LessonId.LessonId.equals(lesson.id));

    //     // let lessonPersistence = OdmLessonMapper.toPersistence(lesson);
    //     // let userPersistence = await odmUserMapper.toPersistence(user.Value);

    //     const OrmComment = OdmLessonCommentEntity.create(
    //         Domain.Id.commentId,
    //         Domain.PublicationDate.PublicationDate,
    //         Domain.Body.Body,
    //         lessonPersistence, //Aqui se agrega La leccion completa
    //         userPersistence,
    //         // Domain.UserLiked.UserLiked,
    //         // Domain.UserDisliked.UserDisliked
    //     );
    //     return Promise.resolve(OrmComment);
    // }
    
}