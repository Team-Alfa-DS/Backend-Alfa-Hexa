import { DomainEvent } from "../../../../src/common/domain/domain-event";
import { CategoryId } from "../valueObjects/categoryId";
import { CategoryName } from "../valueObjects/categoryName";
import { CategoryIcon } from "../valueObjects/categoryIcon";

export class CategoryRegister extends DomainEvent {

    protected constructor(
        public id: CategoryId,
        public name: CategoryName,
        public icon: CategoryIcon
    ) {
        super()
    }

    static create(
        id: CategoryId,
        name: CategoryName,
        icon: CategoryIcon
    ): CategoryRegister {
        return new CategoryRegister(id, name, icon);
    }
}