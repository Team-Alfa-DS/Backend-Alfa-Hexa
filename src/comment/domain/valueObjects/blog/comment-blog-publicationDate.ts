import { ValueObject } from "src/common/domain/value-object";
import { EmptyBlogCommentPublicationDateException } from "../../exceptions/blog/empty-comment-blog-publicationDate-exception";
import { InvalidBlogCommentPublicationDateException } from "../../exceptions/blog/invalid-comment-blog-publicationDate-exception";
import { BadFormaBlogCommentPublicationDateException } from "../../exceptions/blog/bad-format-comment-blog-publicationDate-exception";


export class CommentBlogPublicationDate extends ValueObject<CommentBlogPublicationDate> {
    private readonly publicationDate: Date;
    
    
    private constructor(publicationDate: Date) {
        super();
        
        if (!publicationDate ) throw new EmptyBlogCommentPublicationDateException(`La fecha no puede ser vacia`);
        
        if (publicationDate > new Date()) throw new InvalidBlogCommentPublicationDateException(`La fecha ${publicationDate} no es valida`);
        this.publicationDate = Object.freeze(publicationDate); //*Esto funciona para que no pueda ser modificado el id
    }

    get PublicationDate(): Date {
        return this.publicationDate;
    }
    
    equals(obj: CommentBlogPublicationDate): boolean {
        return this.publicationDate === obj.publicationDate;
    }

    static create(date: Date): CommentBlogPublicationDate {
        return new CommentBlogPublicationDate(date);
    }
}