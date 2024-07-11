import { Category } from "src/category/domain/Category";
import { ICategoryCommandRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { Result } from "src/common/domain/result-handler/result";
import { OdmCategoryEntity } from "../entities/odm-entities/odm-category.entity";
import { Model } from "mongoose";
import { OdmCategoryMapper } from "../mapper/odm-mapperCategory";
import { CategoryNotFoundException } from "src/category/domain/exceptions/category-not-found-exception";
import { CategoryName } from "src/category/domain/valueObjects/categoryName";
import { ICategoryQueryRepository } from "src/category/domain/repositories/ICategoryQuery.repository";


export class OdmCategoryRepository implements ICategoryQueryRepository{
    constructor(private categoryModel: Model<OdmCategoryEntity>, private odmCategoryMapper: OdmCategoryMapper) {
        
    }
    async getCategoryById(id: CategoryId): Promise<Result<Category>> {
        // try {
            
        // } catch (error) {
        //     return Result.fail(new CategoryNotFoundException(`Categoria con el id ${id.value} no encontrada`));
        // }
        const response = await this.categoryModel.findOne({id: id.value});
        // if(!response) return Result.fail(new CategoryNotFoundException(`Categoria con el id ${id.value} no encontrada`));
        if (!response) { throw new CategoryNotFoundException(`Categoria con el id ${id.value} no encontrada`)}
        const domainCategory = await this.odmCategoryMapper.toDomain(response);
        return Result.success(domainCategory);
        
    }

    async getCategoryByName(name: CategoryName): Promise<boolean> {
        const response = await this.categoryModel.findOne({name: name.value});
        if (response) return true;
        return false;
    }

    async saveCategory(category: Category): Promise<void> {
        const categoryOdm = await this.odmCategoryMapper.toPersistence(category)
        await this.categoryModel.create(categoryOdm)
    }

    async getAllCategory(page: number=0, perpage: number=5): Promise<Result<Category[]>> {
        // try {
            
        // } catch (error) {
        //     return Result.fail(new CategoryNotFoundException('Categoria no encontrada'));
        // }
        const resp = await this.categoryModel.find();
        // if(!resp) return Result.fail(new CategoryNotFoundException('Categoria no encontrada'));
        if (!resp) { throw new CategoryNotFoundException('Categoria no encontrada') }
        const domainCategories: Category[] = []
        for (const category of resp) {
            domainCategories.push(await this.odmCategoryMapper.toDomain(category))
        }
        return Result.success(domainCategories);
    }
    
}