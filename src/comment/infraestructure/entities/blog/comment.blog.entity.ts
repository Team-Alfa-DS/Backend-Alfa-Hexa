import { BlogEntity } from "src/blog/infraestructure/entities/blog.entity";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('comment')
export class BlogCommentEntity {
    @ApiProperty({
        description: 'Id del comentario',
        example: '75645sd342sdafsfssaf'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({
        description: 'Fecha de publicacion del comentario',
        example: '03/04/2024'
    })
    @Column()
    publication_date: Date;


    @ApiProperty({
        description: 'Cantidad de likes que posee el comentario',
        example: '324'
    })
    @Column({nullable: true})
    count_likes?: number;


    @ApiProperty({
        description: 'cantidad de dislikes que posee el comentario',
        example: '15'
    })
    @Column({nullable: true})
    count_dislikes?: number;
    

    @ApiProperty({
        description: 'Confirma si le gusta el comentario al usuario que lo esta viendo',
        example: 'True'
    })
    @Column({nullable: true})
    userLiked?: boolean;


    @ApiProperty({
        description: 'Confirma si no le gusta el comentario al usuario que lo esta viendo',
        example: 'False'
    })
    @Column({nullable: true})
    userDisliked?: boolean;

    @ApiProperty({
        description: 'contenido del comentario',
        example: 'Me gusto mucho este blog'
    })
    @Column()
    body: string;

    @ManyToOne(() => UserEntity, user => user.comments)
    @JoinColumn({name: 'user_id'})
    user: string;

    @Column({ name: 'blog_id', nullable: true }) 
    blog_id: string;
    @ManyToOne(() => BlogEntity, (blog) => blog.comments, { eager: true, nullable: true }) 
    @JoinColumn({name: 'blog_id'}) 
    blog: BlogEntity;
    
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
        const comment = new BlogCommentEntity()
        comment.id = id;
        comment.publication_date = publication_date;
        comment.body = body;
        comment.user = userId;
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
        return this.user;
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