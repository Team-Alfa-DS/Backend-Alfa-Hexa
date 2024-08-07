import { ValueObject } from "src/common/domain/value-object";
import { EmptyLessonCommentPublicationDateException } from "../../exceptions/lesson/empty-comment-lesson-publicationDate-exception";
import { ExceededLessonCommentPublicationDateException } from "../../exceptions/lesson/exceeded-comment-publicationDate-exception";


export class CommentLessonPublicationDate extends ValueObject<CommentLessonPublicationDate> {
    private readonly publicationDate: Date;
    
    
    private constructor(publicationDate: Date) {
        super();
        
        if (!publicationDate ) throw new EmptyLessonCommentPublicationDateException(`La fecha ${publicationDate} no es valida`);
        
        if (publicationDate > new Date()) throw new ExceededLessonCommentPublicationDateException(`La fecha ${publicationDate} no es valida`);
        this.publicationDate = Object.freeze(publicationDate); //*Esto funciona para que no pueda ser modificado el id
    }

    get PublicationDate(): Date {
        return this.publicationDate;
    }
    
    equals(obj: CommentLessonPublicationDate): boolean {
        return this.publicationDate === obj.publicationDate;
    }

    static create(date: Date): CommentLessonPublicationDate {
        return new CommentLessonPublicationDate(date);
    }
}