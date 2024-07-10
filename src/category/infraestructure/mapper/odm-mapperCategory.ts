
import { IMapper } from "src/category/application/mapper/mapper.interface";
import { Category } from "src/category/domain/Category";
import { OrmCategoryEntity } from "../entities/orm-entities/orm-category.entity";
import { CategoryId } from '../../domain/valueObjects/categoryId';
import { CategoryName } from '../../domain/valueObjects/categoryName';
import { CategoryIcon } from '../../domain/valueObjects/categoryIcon';
import { OdmCategoryEntity } from "../entities/odm-entities/odm-category.entity";


export class OdmCategoryMapper implements IMapper<Category, OdmCategoryEntity>{

    async toPersistence(domainEntity: Category): Promise<OdmCategoryEntity> {

        const odmCategory : OdmCategoryEntity = OdmCategoryEntity.create(
            domainEntity.Id.value,
            domainEntity.Name.value,
            domainEntity.Icon.value
        );
        return odmCategory;
    }

    async toDomain(odmEntity: OdmCategoryEntity): Promise<Category> {
        const id = CategoryId.create(odmEntity.id);
        const name = CategoryName.create(odmEntity.name);
        const icon = CategoryIcon.create(odmEntity.icon);
        return  Category.create(
            id,
            name,
            icon
        );
    }
}