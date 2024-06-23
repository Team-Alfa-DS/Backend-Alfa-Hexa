/* eslint-disable prettier/prettier */
import { Result } from "src/common/domain/result-handler/result";
import { Category } from "../Category";
import { CategoryId } from "../valueObjects/categoryId";

export interface ICategoryRepository{
    getCategoryById(id: CategoryId): Promise<Result<Category>>;
    getAllCategory(page: number, perpage: number): Promise<Result<Category[]>>
}