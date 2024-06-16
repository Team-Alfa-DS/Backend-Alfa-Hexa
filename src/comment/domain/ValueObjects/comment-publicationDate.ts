import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentPublicationDateException } from "../exceptions/invalid-commeny-publicationDate-exception";

export class CommentpublicationDate extends ValueObject<CommentpublicationDate> {
    private readonly publicationDate: Date;
    
    
    private constructor(publicationDate: Date) {
        super();
        
        let valid: boolean = true;
        
        if (!publicationDate ) valid = false;
        if (publicationDate > new Date() || publicationDate < new Date()) valid = false;
        if (!valid) throw new InvalidCommentPublicationDateException(`La fecha ${publicationDate} no es valida`);

        this.publicationDate = Object.freeze(publicationDate); //*Esto funciona para que no pueda ser modificado el id
    }

    get date(): Date {
        return this.date;
    }
    
    equals(obj: CommentpublicationDate): boolean {
        return this.publicationDate === obj.date;
    }

    static create(date: Date): CommentpublicationDate {
        return new CommentpublicationDate(date);
    }
}