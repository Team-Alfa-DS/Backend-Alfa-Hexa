import { ValueObject } from "src/common/domain/value-object";


export class BlogTitle extends ValueObject<BlogTitle>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new Error(`BlogTitle ${value} is invalid`);
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