import { ValueObject } from "../../../../src/common/domain/value-object";
import { EmptyCategoryIconException } from "../exceptions/empty-category-icon.exception";

export class CategoryIcon extends ValueObject<CategoryIcon>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new EmptyCategoryIconException(`El CategoryIcon ${value} es invalido`);
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
        return value.length > 0;
    }
}