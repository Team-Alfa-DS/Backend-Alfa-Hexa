import { ValueObject } from "src/common/domain/value-object";
import { EmptyCategoryNameException } from "../exceptions/empty-category-name.exception";


export class CategoryName extends ValueObject<CategoryName>{
    private constructor(public value: string) {
        super();
        if (!this.isValid(value)) {
            throw new EmptyCategoryNameException(`CategoryName no debe estar vacio`);
        } 

        this.value = value;
    }

    equals(categoryName: CategoryName): boolean {
        return this.value === categoryName.value;
    }

    public static create(categoryName: string): CategoryName {
        return new CategoryName(categoryName);
    }

    private isValid(value: string): boolean {
        return value.length > 0;
    }
}