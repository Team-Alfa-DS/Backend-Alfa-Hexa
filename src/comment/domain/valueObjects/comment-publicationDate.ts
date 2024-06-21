import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentPublicationDateException } from "../exceptions/invalid-comment-publicationDate-exception";
import { EmptyCommentPublicationDateException } from "../exceptions/empty-comment-publicationDate-exception copy";
import { BadFormatCommentPublicationDateException } from "../exceptions/bad-format-comment-publicationDate-exception";


export class CommentPublicationDate extends ValueObject<CommentPublicationDate> {
    private readonly publicationDate: Date;
    
    
    private constructor(publicationDate: Date) {
        super();
        
        if (!publicationDate ) throw new EmptyCommentPublicationDateException(`La fecha ${publicationDate} no es valida`);
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(publicationDate.toLocaleDateString())) {
            throw new BadFormatCommentPublicationDateException(`La fecha ${publicationDate} no tiene el formato correcto`);
        }
        if (publicationDate > new Date() || publicationDate < new Date()) throw new InvalidCommentPublicationDateException(`La fecha ${publicationDate} no es valida`);
        this.publicationDate = Object.freeze(publicationDate); //*Esto funciona para que no pueda ser modificado el id
    }

    get PublicationDate(): Date {
        return this.publicationDate;
    }
    
    equals(obj: CommentPublicationDate): boolean {
        return this.publicationDate === obj.publicationDate;
    }

    static create(date: Date): CommentPublicationDate {
        return new CommentPublicationDate(date);
    }
}