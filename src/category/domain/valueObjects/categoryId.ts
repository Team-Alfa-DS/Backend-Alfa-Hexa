import { ValueObject } from "src/common/domain/value-object";


export class CategoryId extends ValueObject<CategoryId> {
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new Error(`CategoryId ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(categoryId: CategoryId): boolean {
        return this.value === categoryId.value;
    }

    public static create(categoryId: string): CategoryId {
        return new CategoryId(categoryId);
    }

    private isValid(value: string): boolean {
        const UUID_FORMAT =/([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;
        return !!value.match(UUID_FORMAT);

    }
}