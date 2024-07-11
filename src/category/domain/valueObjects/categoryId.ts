import { ValueObject } from "../../../../src/common/domain/value-object";
import { NotCorrectFormatCategoryIDException } from "../exceptions/not-correct-format-category-id.exception";
import { EmptyCategoryIdException } from "../exceptions/empty-category-id.exception";


export class CategoryId extends ValueObject<CategoryId> {
    private constructor(public value: string) {
        super();

        if (!value) new EmptyCategoryIdException(`El CategoryId no debe estar vacio`);
        if (!this.isValid(value)) {
            throw new NotCorrectFormatCategoryIDException(`El CategoryId ${value} no tiene el formato correcto, debe ser de tipo UUID`);
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