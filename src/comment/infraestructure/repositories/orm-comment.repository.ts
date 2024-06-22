import { DataSource, Repository } from "typeorm";
import { CommentEntity } from "../entities/comment.entity";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { Comment } from "src/comment/domain/comment";
import { CommentBlogId } from "src/comment/domain/valueObjects/comment-blogId";
import { CommentLessonId } from "src/comment/domain/valueObjects/comment-lessonId";

export class OrmCommentRepository extends Repository<CommentEntity> implements ICommentRepository{
    
    private ormCommentMapper: IMapper<Comment, CommentEntity>;

    constructor(ormCommentMapper: IMapper<Comment,CommentEntity>, dataSource: DataSource){
        super(CommentEntity,dataSource.manager);
        this.ormCommentMapper = ormCommentMapper;
    }
    
    async findAllCommentsByBlogId(id: CommentBlogId, runner: TransactionHandler): Promise<Result<Comment[]>> {
        const runnerTransaction = runner.getRunner();

        const commentsFound = await runnerTransaction.manager.createQueryBuilder(CommentEntity, "comment")
            //.take(perPage)
            //.skip(page)
            .where("comment.lesson_id = :id", { id })
            .getMany();

        // const commentsFound = await runnerTransaction.manager.find(CommentEntity,{ where: { blog_id: id },
        //     take: page,
        //     skip: perPage,});

        if (!commentsFound) return Result.fail<Comment[]>(new Error('Comments not found'), 404, 'Comments not found');

        const ListMapper = []
        commentsFound.forEach(async e => { 
            ListMapper.push( 
                await this.ormCommentMapper.toDomain(e ))  
        });

        return Result.success<Comment[]>(ListMapper,200);
    }

    async findAllCommentsByLessonId(id: CommentLessonId, runner: TransactionHandler): Promise<Result<Comment[]>> {
        const runnerTransaction = runner.getRunner();
        
        
        const commentsFound = await runnerTransaction.manager.createQueryBuilder(CommentEntity, "comment")
            .where("comment.lesson_id = :id", { id })
            .getMany();


        // const commentsFound = await runnerTransaction.manager.find(CommentEntity, { where: { lesson_id: id }, 
        //     take: page, 
        //     skip: perPage 
        // });

        if (!commentsFound) return Result.fail<Comment[]>(new Error( 
            `Ha ocurrido un error al encontrar los coemtarios por id` ), 404, 'Comments not found');

        const ListMapper = []
        commentsFound.forEach(async e => {
            ListMapper.push( 
                await this.ormCommentMapper.toDomain(e ))
        });

        return Result.success<Comment[]>(ListMapper,200);
    }

    async saveComment(comment: Comment, runner: TransactionHandler): Promise<Result<Comment>> {
        const runnerTransaction = runner.getRunner();
        try{
            const ormComment = await this.ormCommentMapper.toOrm(comment);
            await runnerTransaction.manager.save(ormComment);
            return Result.success<Comment>(comment, 200);                                                    
        }catch(err){
            return Result.fail<Comment>(new Error(err.message), err.code, err.message);
        }

    };

}