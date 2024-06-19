import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentBlogPublicationDateException } from "../../exceptions/blog/invalid-blog-comment-publicationDate-exception";


export class CommentBlogPublicationDate extends ValueObject<CommentBlogPublicationDate> {
    private readonly publicationDate: Date;
    
    
    private constructor(publicationDate: Date) {
        super();
        
        let valid: boolean = true;
        
        if (!publicationDate ) valid = false;
        if (publicationDate > new Date() || publicationDate < new Date()) valid = false;
        if (!valid) throw new InvalidCommentBlogPublicationDateException(`La fecha ${publicationDate} no es valida`);

        this.publicationDate = Object.freeze(publicationDate); //*Esto funciona para que no pueda ser modificado el id
    }

    get date(): Date {
        return this.date;
    }
    
    equals(obj: CommentBlogPublicationDate): boolean {
        return this.publicationDate === obj.date;
    }

    static create(date: Date): CommentBlogPublicationDate {
        return new CommentBlogPublicationDate(date);
    }
}