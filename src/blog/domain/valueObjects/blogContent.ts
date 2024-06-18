import { ValueObject } from "src/common/domain/value-object";


export class BlogContent  extends ValueObject<BlogContent>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new Error(`BlogContent ${value} is invalid`);
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