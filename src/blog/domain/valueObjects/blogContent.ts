import { ValueObject } from "../../../../src/common/domain/value-object";
import { InvalidBlogContent } from "../exceptions/invalidBlogContent";


export class BlogContent  extends ValueObject<BlogContent>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new InvalidBlogContent(`BlogContent ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(blogContent: BlogContent): boolean {
        return this.value === blogContent.value;
    }

    public static create(blogContent: string): BlogContent {
        return new BlogContent(blogContent);
    }

    private isValid(value: string): boolean {
        return value.length > 0;
    }


}