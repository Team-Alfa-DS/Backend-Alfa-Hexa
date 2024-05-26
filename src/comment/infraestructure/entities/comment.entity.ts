import { Blog } from "src/blog/infraestructure/entities/blog.entity";
import { LessonEntity } from "src/course/infraestructure/entities/lesson.entity";
import { User } from "src/user/infraestructure/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name: 'user_id'})
    user: string;

    @ManyToOne(() => Blog, blog => blog.comments)
    @JoinColumn({name: 'blog_id'})
    blog?: string;

    @ManyToOne(() => LessonEntity, lesson => lesson.comments)
    @JoinColumn({name: 'lesson_id'})
    lesson?: string;

    
    static create (
        id: string,
        publication_date: Date,
        body: string,
        userId: string,
        blogId: string,
        lessonId: string,
        count_likes?: number,
        count_dislikes?: number,
        userLiked?: boolean,
        userDisliked?: boolean,
    ){
        const comment = new CommentEntity()
        comment.id = id;
        comment.publication_date = publication_date;
        comment.body = body;
        comment.user = userId;
        comment.blog = blogId;
        comment.lesson = lessonId;
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
        return this.blog;
    }

    get LessonId(): string {
        return this.lesson;
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