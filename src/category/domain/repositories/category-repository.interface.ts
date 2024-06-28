/* eslint-disable prettier/prettier */
import { Result } from "src/common/domain/result-handler/result";
import { Category } from "../Category";

export interface ICategoryRepository{
    getCategoryById(id: string): Promise<Result<Category>>;
    getAllCategory(page: number, perpage: number): Promise<Result<Category[]>>
}