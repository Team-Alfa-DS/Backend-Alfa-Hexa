import { DataSource, Repository } from "typeorm";
import { CommentEntity } from "../entities/comment.entity";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { Comment } from "src/comment/domain/Comment";


export class OrmCommentRepository extends Repository<CommentEntity> implements ICommentRepository{
    
    private ormCommentMapper: IMapper<Comment, CommentEntity>;

    constructor(ormCommentMapper: IMapper<Comment,CommentEntity>, dataSource: DataSource){
        super(CommentEntity,dataSource.manager);
        this.ormCommentMapper = ormCommentMapper;
    }
    
    async findAllComments(id: string, runner: TransactionHandler): Promise<Result<Comment[]>> {
        const runnerTransaction = runner.getRunner();

        const commentsFound = await runnerTransaction.manager.find(CommentEntity,{ where: { blogId: id }});

        if (!commentsFound) return Result.fail<Comment[]>(new Error('Comments not found'), 404, 'Comments not found');

        return Result.success<Comment[]>(commentsFound,200);
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

    }

}