import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentPublicationDateException } from "../../exceptions/invalid-comment-publicationDate-exception";
import { BadFormatLessonCommentPublicationDateException } from "../../exceptions/lesson/bad-format-comment-lesson-publicationDate-exception";
import { EmptyLessonCommentPublicationDateException } from "../../exceptions/lesson/empty-comment-lesson-publicationDate-exception";


export class CommentLessonPublicationDate extends ValueObject<CommentLessonPublicationDate> {
    private readonly publicationDate: Date;
    
    
    private constructor(publicationDate: Date) {
        super();
        
        if (!publicationDate ) throw new EmptyLessonCommentPublicationDateException(`La fecha ${publicationDate} no es valida`);
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(publicationDate.toLocaleDateString())) {
            throw new BadFormatLessonCommentPublicationDateException(`La fecha ${publicationDate} no tiene el formato correcto`);
        }
        if (publicationDate > new Date() || publicationDate < new Date()) throw new InvalidCommentPublicationDateException(`La fecha ${publicationDate} no es valida`);
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