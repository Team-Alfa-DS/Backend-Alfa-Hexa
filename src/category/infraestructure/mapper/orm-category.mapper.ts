/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { IMapper } from "src/category/application/mapper/mapper.interface";
import { Category } from "src/category/domain/Category";
import { OrmCategoryEntity } from "../entities/orm-entities/orm-category.entity";
import { CategoryId } from '../../domain/valueObjects/categoryId';
import { CategoryName } from '../../domain/valueObjects/categoryName';
import { CategoryIcon } from '../../domain/valueObjects/categoryIcon';

/* eslint-disable prettier/prettier */

export class OrmCategoryMapper{

    toPersistence(domainEntity: Category):OrmCategoryEntity {

        const ormCategory : any = OrmCategoryEntity.create(
            domainEntity.Id.value,
            domainEntity.Name.value,
            domainEntity.Icon.value
        );

        return ormCategory;

    }

    toDomain(ormEntity: OrmCategoryEntity): Category {
        console.log('entra en el mapper')
        const id = CategoryId.create(ormEntity.id);
        const name = CategoryName.create(ormEntity.name);
        const icon = CategoryIcon.create(ormEntity.icon);
        console.log({icon})
        console.log({id, name, icon})
        return  Category.create(
            id,
            name,
            icon
        );
    //     console.log({domainCategory})
    //     return domainCategory;
    }
}