import { ValueObject } from "../../../../src/common/domain/value-object";
import { InvalidBlogId } from "../exceptions/invalidBlogId";

export class BlogId extends ValueObject<BlogId> {
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new InvalidBlogId(`BlogId ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(blogId: BlogId): boolean {
        return this.value === blogId.value;
    }

    public static create(blogId: string): BlogId {
        return new BlogId(blogId);
    }

    private isValid(value: string): boolean {
        const UUID_FORMAT =/([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;
        return !!value.match(UUID_FORMAT);

    }
}