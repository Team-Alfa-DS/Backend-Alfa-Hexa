import { DataSource, Repository } from "typeorm";
import { Result } from "src/common/domain/result-handler/result";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { ILessonCommentRepository } from "src/comment/domain/repositories/lesson/comment-repository.interface";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { CommentLesson } from "src/comment/domain/comment-lesson";
import { LessonCommentEntity } from "../../entities/lesson/comment.lesson.entity";

export class OrmLessonCommentRepository extends Repository<LessonCommentEntity> implements ILessonCommentRepository{
    
    private ormCommentMapper: IMapper<CommentLesson, LessonCommentEntity>;

    constructor(ormCommentMapper: IMapper<CommentLesson,LessonCommentEntity>, dataSource: DataSource){
        super(LessonCommentEntity,dataSource.manager);
        this.ormCommentMapper = ormCommentMapper;
    }
    

    async findAllCommentsByLessonId(id: LessonCommentLessonId, runner: TransactionHandler): Promise<Result<CommentLesson[]>> {
        const runnerTransaction = runner.getRunner();
        
        
        const commentsFound = await runnerTransaction.manager.createQueryBuilder(LessonCommentEntity, "comment")
            .where("comment.lesson_id = :id", { id })
            .getMany();


        // const commentsFound = await runnerTransaction.manager.find(CommentEntity, { where: { lesson_id: id }, 
        //     take: page, 
        //     skip: perPage 
        // });

        if (!commentsFound) return Result.fail<CommentLesson[]>(new Error( 
            `Ha ocurrido un error al encontrar los coemtarios por id` ), 404, 'Comments not found');

        const ListMapper = []
        commentsFound.forEach(async e => {
            ListMapper.push( 
                await this.ormCommentMapper.toDomain(e ))
        });

        return Result.success<CommentLesson[]>(ListMapper,200);
    }

    async saveComment(comment: CommentLesson, runner: TransactionHandler): Promise<Result<CommentLesson>> {
        const runnerTransaction = runner.getRunner();
        try{
            const ormComment = await this.ormCommentMapper.toOrm(comment);
            await runnerTransaction.manager.save(ormComment);
            return Result.success<CommentLesson>(comment, 200);                                                    
        }catch(err){
            return Result.fail<CommentLesson>(new Error(err.message), err.code, err.message);
        }

    };

}