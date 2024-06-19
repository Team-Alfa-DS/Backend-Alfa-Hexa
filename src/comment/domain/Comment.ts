import { Entity } from "src/common/domain/entity";


export class Comment extends Entity<string> {
    private publicationDate: Date;
    private body: string;
    private userId: string; //se necesita la entity de user
    private blogId?: string; //se necesita la entity de blog
    private lessonId?: string;
    private countLikes?: number;
    private countDislikes?: number;
    private userLiked?: boolean;
    private userDisliked?: boolean;
    
    protected constructor(
        id: string,
        publicationDate: Date,
        body: string,
        userId: string,
        blogId?: string,
        lessonId?:string,
        countLikes?: number,
        countDislikes?: number,
        userLiked?: boolean,
        userDisliked?: boolean,
    ){
        super(id),
        this.publicationDate = publicationDate,
        this.body = body
        this.userId = userId;
        this.blogId = blogId;
        this.lessonId = lessonId;
        this.countLikes = countLikes,
        this.countDislikes = countDislikes,
        this.userDisliked = userDisliked;
        this.userLiked = userLiked;
    }


    static create (
        id: string,
        publicationDate: Date,
        body: string,
        userId: string,
        blogId?: string,
        lessonId?:string,
        countLikes?: number,
        countDislikes?: number,
        userLiked?: boolean,
        userDisliked?: boolean,
    ){
        return new Comment(
            id,
            publicationDate,
            body,
            userId,
            blogId,
            lessonId,
            countLikes,
            countDislikes,
            userLiked,
            userDisliked
        );        
    }

    get PublicationDate(): Date {
        return this.publicationDate;
    }

    get CountLikes(): number | undefined {
        return this.countLikes;
    }

    get CountDislikes(): number | undefined {
        return this.countDislikes;
    }

    get UserLiked(): boolean | undefined {
        return this.userLiked;
    }

    get UserDisliked(): boolean | undefined {
        return this.userDisliked;
    }

    get Body(): string {
        return this.body;
    }

    get UserId(): string {
        return this.userId;
    }

    get BlogId(): string {
        return this.blogId;
    }

    get LessonId(): string {
        return this.lessonId;
    }
}