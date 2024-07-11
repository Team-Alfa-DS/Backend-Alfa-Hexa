/* eslint-disable prettier/prettier */
import { Result } from "src/common/domain/result-handler/result";
import { Category } from "../Category";
import { CategoryId } from "../valueObjects/categoryId";
import { CategoryName } from "../valueObjects/categoryName";

export interface ICategoryCommandRepository{
    getCategoryById(id: CategoryId): Promise<Result<Category>>;
    getAllCategory(page: number, perpage: number): Promise<Result<Category[]>>;
    getCategoryByName(name: CategoryName): Promise<boolean>;
    saveCategory(category: Category): Promise<void>;
}