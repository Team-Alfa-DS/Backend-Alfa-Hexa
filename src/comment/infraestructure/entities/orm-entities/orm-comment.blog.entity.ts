import { OrmBlogEntity } from "src/blog/infraestructure/entities/orm-entities/orm-blog.entity";
import { OrmUserEntity } from "src/user/infraestructure/entities/orm-entities/orm-user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('blog_comment')
export class OrmBlogCommentEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn({type: 'uuid'})
    blog_id: string;

    @PrimaryColumn({type: 'uuid'})
    user_id: string;

    @Column()
    publication_date: Date;

    @Column({nullable: true})
    count_likes?: number;

    @Column({nullable: true})
    count_dislikes?: number;
    
    @Column({nullable: true})
    userLiked?: boolean;

    @Column({nullable: true})
    userDisliked?: boolean;

    @Column()
    body: string;

    @ManyToOne(() => OrmUserEntity, user => user.blogComments)
    @JoinColumn({name: 'user_id'})
    user: OrmUserEntity;

    @ManyToOne(() => OrmBlogEntity, (blog) => blog.comments, { eager: true, nullable: true }) 
    @JoinColumn({name: 'blog_id'}) 
    blog: OrmBlogEntity;
    
    static create (
        id: string,
        publication_date: Date,
        body: string,
        userId: string,
        blogId: string,
        count_likes?: number,
        count_dislikes?: number,
        userLiked?: boolean,
        userDisliked?: boolean,
    ){
        const comment = new OrmBlogCommentEntity()
        comment.id = id;
        comment.publication_date = publication_date;
        comment.body = body;
        comment.user_id = userId;
        comment.blog_id = blogId;
        comment.count_likes = count_likes;
        comment.count_dislikes = count_dislikes;
        comment.userLiked = userLiked;
        comment.userDisliked = userDisliked;
        return comment
    }

    get Id(): string {
        return this.id;
    }

    get PublicationDate(): Date {
        return this.publication_date;
    }

    get Body(): string {
        return this.body;
    }

    get UserId(): string {
        return this.user_id;
    }

    get BlogId(): string {
        return this.blog_id;
    }

    get CountLikes(): number | undefined {
        return this.count_likes;
    }

    get CountDislikes(): number | undefined {
        return this.count_dislikes;
    }

    get UserLiked(): boolean | undefined {
        return this.userLiked;
    }

    get UserDisliked(): boolean | undefined {
        return this.userDisliked;
    }

}