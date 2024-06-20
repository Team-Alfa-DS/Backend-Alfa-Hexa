import { ValueObject } from "src/common/domain/value-object";
import { InvalidCommentPublicationDateException } from "../exceptions/invalid-comment-publicationDate-exception";


export class CommentPublicationDate extends ValueObject<CommentPublicationDate> {
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
    
    equals(obj: CommentPublicationDate): boolean {
        return this.publicationDate === obj.date;
    }

    static create(date: Date): CommentPublicationDate {
        return new CommentPublicationDate(date);
    }
}