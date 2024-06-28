/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { IMapper } from "src/category/application/mapper/mapper.interface";
import { Category } from "src/category/domain/Category";
import { OrmCategoryEntity } from "../entities/orm-entities/orm-category.entity";
import { CategoryId } from '../../domain/valueObjects/categoryId';
import { CategoryName } from '../../domain/valueObjects/categoryName';
import { CategoryIcon } from '../../domain/valueObjects/categoryIcon';

/* eslint-disable prettier/prettier */

export class OrmCategoryMapper implements IMapper<Category, OrmCategoryEntity> {
    static toDomain(result: OrmCategoryEntity): Category | PromiseLike<Category> {
      throw new Error("Method not implemented.");
    }

    async toOrm(domainEntity: Category):Promise<OrmCategoryEntity> {

        const ormCategory : any = OrmCategoryEntity.create(
            domainEntity.Id.value,
            domainEntity.Name.value,
            domainEntity.Icon.value
        );

        return ormCategory;

    }

    async toDomain(ormEntity: OrmCategoryEntity): Promise<Category> {
        const domainCategory = Category.Create(
            CategoryId.create(ormEntity.id),
            CategoryName.create(ormEntity.name),
            CategoryIcon.create(ormEntity.icon)

        );
        return domainCategory;
    }

}