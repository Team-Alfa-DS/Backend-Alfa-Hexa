
import { IMapper } from "src/category/application/mapper/mapper.interface";
import { Category } from "src/category/domain/Category";
import { OrmCategoryEntity } from "../entities/orm-entities/orm-category.entity";
import { CategoryId } from '../../domain/valueObjects/categoryId';
import { CategoryName } from '../../domain/valueObjects/categoryName';
import { CategoryIcon } from '../../domain/valueObjects/categoryIcon';
import { OdmCategoryEntity } from "../entities/odm-entities/odm-category.entity";


export class OdmCategoryMapper{

    toPersistence(domainEntity: Category):OdmCategoryEntity {

        const ormCategory : any = OrmCategoryEntity.create(
            domainEntity.Id.value,
            domainEntity.Name.value,
            domainEntity.Icon.value
        );

        return ormCategory;

    }

    toDomain(odmEntity: OdmCategoryEntity): Category {
        console.log('entra en el mapper')
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