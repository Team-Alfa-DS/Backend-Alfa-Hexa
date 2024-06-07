/* eslint-disable prettier/prettier */

import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";

export class GetCategoryByIdService{
    OrmCategoryRepository: any;
    constructor (private readonly categoryRepository: ICategoryRepository){}
    
    execute(categoryId: string): Promise<Category>{
        return this.categoryRepository.getCategoryById(categoryId);
    }
}