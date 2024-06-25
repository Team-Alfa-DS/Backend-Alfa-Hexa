/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { IMapper } from "src/category/application/mapper/mapper.interface";
import { Category } from "src/category/domain/Category";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryId } from '../../domain/valueObjects/categoryId';
import { CategoryName } from '../../domain/valueObjects/categoryName';
import { CategoryIcon } from '../../domain/valueObjects/categoryIcon';

/* eslint-disable prettier/prettier */

export class OrmCategoryMapper implements IMapper<Category, CategoryEntity> {
    static toDomain(result: CategoryEntity): Category | PromiseLike<Category> {
      throw new Error("Method not implemented.");
    }

    async toOrm(domainEntity: Category):Promise<CategoryEntity> {

        const ormCategory : any = CategoryEntity.create(
            domainEntity.Id.value,
            domainEntity.Name.value,
            domainEntity.Icon.value
        );

        return ormCategory;

    }

    async toDomain(ormEntity: CategoryEntity): Promise<Category> {
        const domainCategory = Category.Create(
            CategoryId.create(ormEntity.id),
            CategoryName.create(ormEntity.name),
            CategoryIcon.create(ormEntity.icon)

        );
        return domainCategory;
    }

}