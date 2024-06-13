import { Entity } from "src/common/domain/entity";


export class Comment extends Entity<string> {
    private Date: Date;
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
        Date: Date,
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
        this.Date = Date,
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
        Date: Date,
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
            Date,
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

    get DDate(): Date {
        return this.Date;
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