import { ValueObject } from "src/common/domain/value-object";
import { InvalidBlogPublicationDate } from "../exceptions/invalidBlogPublicationDate";


export class BlogPublicationDate extends ValueObject<BlogPublicationDate>{
    private constructor(public value: Date) {
        super();
        if (!this.isValid(value)) {
            throw new InvalidBlogPublicationDate(`BlogPublicationDate ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(blogPublicationDate: BlogPublicationDate): boolean {
        return this.value === blogPublicationDate.value;
    }

    public static create(blogPublicationDate: Date): BlogPublicationDate {
        return new BlogPublicationDate(blogPublicationDate);
    }

    private isValid(value: Date): boolean {
        return value <= new Date();
    }
}