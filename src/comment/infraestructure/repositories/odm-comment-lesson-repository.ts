import { Result } from "src/common/domain/result-handler/result";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { CommentLesson } from "src/comment/domain/comment-lesson";
import { IOdmLessonCommentRepository } from "src/comment/application/odm-comment-lesson-repository-interface";
import { OdmLessonCommentEntity } from "../entities/odm-entities/odm-comment.lesson.entity";
import { Model } from "mongoose";
import { OdmBlogCommentMapper } from "../mapper/blog/odm-comment/odm-comment-lesson.mapper";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { OdmLessonCommentMapper } from "../mapper/lesson/odm-mapper/odm-comment-lesson.mapper";
import { CommentsLessonNotFoundException } from "src/comment/domain/exceptions/lesson/comments-lesson-not-found-exception";

export class OrmLessonCommentRepository implements IOdmLessonCommentRepository{
    
    private odmCommentMapper: OdmLessonCommentMapper;
    private readonly commentModel: Model<OdmLessonCommentEntity>;

    constructor(commentModel: Model<OdmLessonCommentEntity>){
        this.commentModel = commentModel;
    }
    
    async findAllCommentsByLessonId(id: LessonCommentLessonId): Promise<Result<CommentLesson[]>> {
        try{
            const r = await this.commentModel.find<OdmLessonCommentEntity>();
            
            if (!r) return Result.fail<CommentLesson[]>(new CommentsLessonNotFoundException( 
                `Ha ocurrido un error al encontrar los comentarios` ));
            
            const comment = r.filter(e => e.lesson.id === id.LessonId.Value)

            const ListMapper = []
            comment.forEach(async e => {
                ListMapper.push( 
                    await this.odmCommentMapper.toDomain(e ))
            });
        
            
            return Result.success<CommentLesson[]>(ListMapper);
        }catch(err){
            return Result.fail(new Error(err.message));
        }
    }

}