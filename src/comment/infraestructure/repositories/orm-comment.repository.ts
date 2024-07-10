import { DataSource, Repository } from "typeorm";
import { Result } from "src/common/domain/result-handler/result";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { ILessonCommentRepository } from "src/comment/domain/repositories/lesson/comment-lesson-repository.interface";
import { OrmLessonCommentEntity } from "../entities/orm-entities/orm-comment.lesson.entity";
import { CommentLesson } from "src/course/domain/entities/comment-lesson";

export class OrmLessonCommentRepository extends Repository<OrmLessonCommentEntity> implements ILessonCommentRepository{
    
    private ormCommentMapper: IMapper<CommentLesson, OrmLessonCommentEntity>;

    constructor(ormCommentMapper: IMapper<CommentLesson,OrmLessonCommentEntity>, dataSource: DataSource){
        super(OrmLessonCommentEntity,dataSource.manager);
        this.ormCommentMapper = ormCommentMapper;
    }
    

    async findAllCommentsByLessonId(id: LessonCommentLessonId, runner: TransactionHandler): Promise<Result<CommentLesson[]>> {
        const runnerTransaction = runner.getRunner();
        
        
        const commentsFound = await runnerTransaction.manager.createQueryBuilder(OrmLessonCommentEntity, "comment")
            .where("comment.lesson_id = :id", { id })
            .getMany();


        // const commentsFound = await runnerTransaction.manager.find(CommentEntity, { where: { lesson_id: id }, 
        //     take: page, 
        //     skip: perPage 
        // });

        if (!commentsFound) return Result.fail<CommentLesson[]>(new Error( 
            `Ha ocurrido un error al encontrar los coemtarios por id` ));

        const ListMapper = []
        commentsFound.forEach(async e => {
            ListMapper.push( 
                await this.ormCommentMapper.toDomain(e ))
        });

        return Result.success<CommentLesson[]>(ListMapper);
    }

    async saveComment(comment: CommentLesson, runner: TransactionHandler): Promise<Result<CommentLesson>> {
        const runnerTransaction = runner.getRunner();
        try{
            const ormComment = await this.ormCommentMapper.toPersistence(comment);
            await runnerTransaction.manager.save(ormComment);
            return Result.success<CommentLesson>(comment);                                                    
        }catch(err){
            return Result.fail<CommentLesson>(new Error(err.message));
        }

    };

}