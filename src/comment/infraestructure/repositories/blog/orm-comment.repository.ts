import { DataSource, Repository } from "typeorm";
import { Result } from "src/common/domain/result-handler/result";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { OrmBlogCommentEntity } from "../../entities/orm-entities/orm-comment.blog.entity";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { IBlogCommentRepository } from "src/comment/domain/repositories/blog/comment-blog-repository.interface";

export class OrmBlogCommentRepository extends Repository<OrmBlogCommentEntity> implements IBlogCommentRepository{
    
    private ormCommentMapper: IMapper<CommentBlog, OrmBlogCommentEntity>;

    constructor(ormCommentMapper: IMapper<CommentBlog,OrmBlogCommentEntity>, dataSource: DataSource){
        super(OrmBlogCommentEntity,dataSource.manager);
        this.ormCommentMapper = ormCommentMapper;
    }
    
    async findAllCommentsByBlogId(id: BlogCommentBlogId, runner: TransactionHandler): Promise<Result<CommentBlog[]>> {
        const runnerTransaction = runner.getRunner();

        const commentsFound = await runnerTransaction.manager.createQueryBuilder(OrmBlogCommentEntity, "comment")
            //.take(perPage)
            //.skip(page)
            .where("comment.blog_id = :id", { id })
            .getMany();

        // const commentsFound = await runnerTransaction.manager.find(CommentEntity,{ where: { blog_id: id },
        //     take: page,
        //     skip: perPage,});

        if (!commentsFound) return Result.fail<CommentBlog[]>(new Error('Comments not found'), 404, 'Comments not found');

        const ListMapper = []
        commentsFound.forEach(async e => { 
            ListMapper.push( 
                await this.ormCommentMapper.toDomain(e ))  
        });

        return Result.success<CommentBlog[]>(ListMapper,200);
    }

    async saveComment(comment: CommentBlog, runner: TransactionHandler): Promise<Result<CommentBlog>> {
        const runnerTransaction = runner.getRunner();
        try{
            const ormComment = await this.ormCommentMapper.toPersistence(comment);
            await runnerTransaction.manager.save(ormComment);
            return Result.success<CommentBlog>(comment, 200);                                                    
        }catch(err){
            return Result.fail<CommentBlog>(new Error(err.message), err.code, err.message);
        }

    };

}