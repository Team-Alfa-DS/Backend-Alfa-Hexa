/* eslint-disable prettier/prettier */
import { Category } from "../Category";

export interface ICategoryRepository{
    getAllCategory(): Promise<Category[]>
}