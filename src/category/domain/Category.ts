/* eslint-disable prettier/prettier */

import { AggregateRoot } from "../../../src/common/domain/aggregate-root";
import { CategoryIcon } from "./valueObjects/categoryIcon";
import { CategoryId } from "./valueObjects/categoryId";
import { CategoryName } from "./valueObjects/categoryName";
import { DomainEvent } from "../../../src/common/domain/domain-event";
import { CategoryCreated } from "./events/category-created.event";
import { CategoryInvalidException } from "./exceptions/category-invalid-exception";
import { CategoryRegister } from "./events/category-register.event";

export class Category extends AggregateRoot<CategoryId>{
    private name: CategoryName
    private icon: CategoryIcon

    
    private constructor (id: CategoryId, name: CategoryName, icon: CategoryIcon){
        const categoryCreated = CategoryCreated.create(id, name, icon);
        super(id, categoryCreated);
       
    }

    protected when(event: DomainEvent): void {
        if (event instanceof CategoryCreated) {
            this.name = event.name,
            this.icon = event.icon
        }


    }

    protected validateState(): void {
        if (!this.name || !this.icon) throw new CategoryInvalidException('La categoria es invalida');
    }

    static create(id: CategoryId, name: CategoryName, icon: CategoryIcon): Category {
        return new Category(id, name, icon);
    }

    Register() {
        this.apply(CategoryRegister.create(this.Id, this.name, this.icon));
    }

    get Name(): CategoryName{
        return this.name;
    }
    get Icon(): CategoryIcon{
        return this.icon;
    }
}
