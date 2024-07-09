import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { Result } from "src/common/domain/result-handler/result";
import { OdmCategoryEntity } from "../entities/odm-entities/odm-category.entity";
import { Model } from "mongoose";
import { OdmCategoryMapper } from "../mapper/odm-mapperCategory";


export class OdmCategoryRepository implements ICategoryRepository{
    constructor(private categoryModel: Model<OdmCategoryEntity>, private odmCategoryMapper: OdmCategoryMapper) {
        
    }
    async getCategoryById(id: CategoryId): Promise<Result<Category>> {
        try {
            const response = await this.categoryModel.findOne({id: id.value});
            if(!response) return Result.fail(new Error('Category not found'));
            const domainCategory = this.odmCategoryMapper.toDomain(response);
            return Result.success(domainCategory);
        } catch (error) {
            return Result.fail(error);
        }

        
    }
    async getAllCategory(page: number=0, perpage: number=5): Promise<Result<Category[]>> {
        try {
            const resp = await this.categoryModel.find().skip(page * perpage).limit(perpage);
            if(!resp) return Result.fail(new Error('Categories not found'));
            const domainCategories = resp.map(category => this.odmCategoryMapper.toDomain(category));
            return Result.success(domainCategories);
        } catch (error) {
            return Result.fail(error);
        }
    }
    
}