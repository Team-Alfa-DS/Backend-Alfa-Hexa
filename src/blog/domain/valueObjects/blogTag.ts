import { ValueObject } from "src/common/domain/value-object";
import { InvalidBlogTag } from "../exceptions/invalidBlogTag";
import { Value } from 'firebase-admin/lib/remote-config/remote-config-api';

export class BlogTag extends ValueObject<BlogTag>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new InvalidBlogTag(`BlogTag ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(blogTag: BlogTag): boolean {
        return this.value === blogTag.value;
    }

    public static create(Value: string): BlogTag {
        console.log(Value)
        return new BlogTag(Value);
    }

    private isValid(value: string): boolean {
        return value.length > 0 && value.length <= 20;
    }
}