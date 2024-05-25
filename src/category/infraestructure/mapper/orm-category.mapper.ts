/* eslint-disable prettier/prettier */

import { IMapper } from "src/category/application/mapper/mapper.interface";
import { Category } from "src/category/domain/Category";
import { CategoryEntity } from "../entities/category.entity";

/* eslint-disable prettier/prettier */

export class OrmCategoryMapper implements IMapper<Category, CategoryEntity> {

    async toOrm(domainEntity: Category):Promise<CategoryEntity> {

        const ormCategory : any = CategoryEntity.create(
            domainEntity.id,
            domainEntity.name,
            domainEntity.icon
        );

        return ormCategory;

    }

    async toDomain(ormEntity: CategoryEntity): Promise<Category> {
        const domainCategory = Category.Create(
            ormEntity.id,
            ormEntity.name,
            ormEntity.icon

        );
        return domainCategory;
    }

}