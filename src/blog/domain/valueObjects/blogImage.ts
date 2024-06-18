import { ValueObject } from "src/common/domain/value-object";


export class BlogImage extends ValueObject<BlogImage>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new Error(`BlogImage ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(blogImage: BlogImage): boolean {
        return this.value === blogImage.value;
    }

    public static create(blogImage: string): BlogImage {
        return new BlogImage(blogImage);
    }

    private isValid(value: string): boolean {
        try {
            new URL(value);
            return true;
        } catch (_) {
            return false;
        }
    }
}