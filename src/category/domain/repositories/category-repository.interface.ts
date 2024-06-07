/* eslint-disable prettier/prettier */
import { Category } from "../Category";

export interface ICategoryRepository{
    getCategoryById(id: string): Promise<Category>;
    getAllCategory(): Promise<Category[]>
}