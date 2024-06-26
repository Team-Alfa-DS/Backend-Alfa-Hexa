import { ValueObject } from "src/common/domain/value-object";

export class CategoryIcon extends ValueObject<CategoryIcon>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new Error(`CategoryIcon ${value} is invalid`);
        } 

        this.value = value;
    }

    equals(categoryIcon: CategoryIcon): boolean {
        return this.value === categoryIcon.value;
    }

    public static create(categoryIcon: string): CategoryIcon {
        return new CategoryIcon(categoryIcon);
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