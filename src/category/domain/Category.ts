/* eslint-disable prettier/prettier */

import { CategoryIcon } from "./valueObjects/categoryIcon";
import { CategoryId } from "./valueObjects/categoryId";
import { CategoryName } from "./valueObjects/categoryName";

export class Category{
    private id: CategoryId;
    private name: CategoryName
    private icon: CategoryIcon

    
    private constructor (id: CategoryId, name: CategoryName, icon: CategoryIcon){
        this.id= id;
        this.name= name;
        this.icon=icon;
       
    }

    static create(id: CategoryId, name: CategoryName, icon: CategoryIcon): Category {
        return new Category(id, name, icon);
    }

    get Id(): CategoryId{
        return this.id;
    }
    get Name(): CategoryName{
        return this.name;
    }
    get Icon(): CategoryIcon{
        return this.icon;
    }
}
