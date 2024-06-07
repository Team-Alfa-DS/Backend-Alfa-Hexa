/* eslint-disable prettier/prettier */
import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";

export class GetAllCategorysService{
    constructor (private readonly categoryRepository: ICategoryRepository){}
    
    execute(): Promise<Category[]>{
        return this.categoryRepository.getAllCategory();
    }
}