import { DataSource, Repository } from "typeorm";
import { CommentEntity } from "../entities/comment.entity";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { Comment } from "src/comment/domain/Comment";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";


export class OrmCommentRepository extends Repository<CommentEntity> implements ICommentRepository{
    
    private ormCommentMapper: IMapper<Comment, CommentEntity>;

    constructor(ormCommentMapper: IMapper<Comment,CommentEntity>, dataSource: DataSource){
        super(CommentEntity,dataSource.manager);
        this.ormCommentMapper = ormCommentMapper;
    }
    
    async findAllCommentsByBlogId(id: string, page: number, perPage: number, runner: TransactionHandler): Promise<Result<Comment[]>> {
        const runnerTransaction = runner.getRunner();

        const commentsFound = await runnerTransaction.manager.find(CommentEntity,{ where: { blog: id },
            take: page,
            skip: perPage,});

        if (!commentsFound) return Result.fail<Comment[]>(new Error('Comments not found'), 404, 'Comments not found');

        const ListMapper = []
        commentsFound.forEach(e => { ListMapper.push( this.ormCommentMapper.toDomain(e ))  
        });

        //const domainComment = await Promise.all(commentsFound.map(comment => this.ormCommentMapper.toDomain(comment)));
        //return Result.success<Comment[]>(domainComment,200);
        
        return Result.success<Comment[]>(ListMapper,200);
    }

    async findAllCommentsByLessonId(id: string, page: number, perPage: number, runner: TransactionHandler): Promise<Result<Comment[]>> {
        const runnerTransaction = runner.getRunner();

        const commentsFound = await runnerTransaction.manager.find(CommentEntity,{ where: { lesson: id },
            take: page,
            skip: perPage,});

        if (!commentsFound) return Result.fail<Comment[]>(new Error('Comments not found'), 404, 'Comments not found');

        const ListMapper = []
        commentsFound.forEach(e => { ListMapper.push( this.ormCommentMapper.toDomain(e ))  
        });

        //const domainComment = await Promise.all(commentsFound.map(comment => this.ormCommentMapper.toDomain(comment)));
        return Result.success<Comment[]>(ListMapper,200);
    }

    async saveComment(comment: Comment, runner: TransactionHandler): Promise<Result<Comment>> {

        try{
            const runnerTransaction = runner.getRunner();
            const ormComment = await this.ormCommentMapper.toORM(comment);
            await runnerTransaction.manager.save(ormComment);
            return Result.success<Comment>(comment, 200);

        }catch(err){
            return Result.fail<Comment>(new Error(err.message), err.code, err.message);
        }

    };

}