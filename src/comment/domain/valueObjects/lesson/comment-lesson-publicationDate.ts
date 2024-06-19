import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentLessonPublicationDateException } from "../../exceptions/lesson/invalid-comment-lesson-publicationDate-exception";


export class CommentLessonPublicationDate extends ValueObject<CommentLessonPublicationDate> {
    private readonly publicationDate: Date;
    
    
    private constructor(publicationDate: Date) {
        super();
        
        let valid: boolean = true;
        
        if (!publicationDate ) valid = false;
        if (publicationDate > new Date() || publicationDate < new Date()) valid = false;
        if (!valid) throw new InvalidCommentLessonPublicationDateException(`La fecha ${publicationDate} no es valida`);

        this.publicationDate = Object.freeze(publicationDate); //*Esto funciona para que no pueda ser modificado el id
    }

    get date(): Date {
        return this.date;
    }
    
    equals(obj: CommentLessonPublicationDate): boolean {
        return this.publicationDate === obj.date;
    }

    static create(date: Date): CommentLessonPublicationDate {
        return new CommentLessonPublicationDate(date);
    }
}