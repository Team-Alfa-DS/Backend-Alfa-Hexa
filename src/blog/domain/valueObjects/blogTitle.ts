import { ValueObject } from "src/common/domain/value-object";
import { InvalidBlogTitle } from "../exceptions/invalidBlogTitle";


export class BlogTitle extends ValueObject<BlogTitle>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new InvalidBlogTitle(`BlogTitle ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(blogTitle: BlogTitle): boolean {
        return this.value === blogTitle.value;
    }

    public static create(blogTitle: string): BlogTitle {
        return new BlogTitle(blogTitle);
    }

    private isValid(value: string): boolean {
        return value.length > 0 && value.length <= 50;
    }
}