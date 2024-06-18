import { ValueObject } from "src/common/domain/value-object";


export class Category extends ValueObject<Category> {
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new Error(`CategoryId ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(categoryId: Category): boolean {
        return this.value === categoryId.value;
    }

    public static create(categoryId: string): Category {
        return new Category(categoryId);
    }

    private isValid(value: string): boolean {
        const UUID_FORMAT =/([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;
        return !!value.match(UUID_FORMAT);

    }
}