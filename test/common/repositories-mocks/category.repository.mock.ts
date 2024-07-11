import { Category } from "../../../src/category/domain/Category";
import { ICategoryRepository } from "../../../src/category/domain/repositories/category-repository.interface";
import { CategoryIcon } from "../../../src/category/domain/valueObjects/categoryIcon";
import { CategoryId } from "../../../src/category/domain/valueObjects/categoryId";
import { CategoryName } from "../../../src/category/domain/valueObjects/categoryName";
import { Result } from "../../../src/common/domain/result-handler/result";


const categories = [
    Category.create(CategoryId.create('123e4567-e89b-12d3-a456-426614174000'), CategoryName.create('Category 1'), CategoryIcon.create('Icon 1')),
    Category.create(CategoryId.create('123e4567-e89b-12d3-a456-426614174001'), CategoryName.create('Category 2'), CategoryIcon.create('Icon 2')),
    Category.create(CategoryId.create('123e4567-e89b-12d3-a456-426614174002'), CategoryName.create('Category 3'), CategoryIcon.create('Icon 3')),
]

export class CategoryMockRepository implements ICategoryRepository{
    async getCategoryById(id: CategoryId): Promise<Result<Category>> {
        const category = categories.find(category => category.Id.equals(id));
        if(!category) return Result.fail(new Error('Category not found'));
        return Result.success(category);
    }
    getAllCategory(page: number, perpage: number): Promise<Result<Category[]>> {
        throw new Error("Method not implemented.");
    }
    getCategoryByName(name: CategoryName): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    saveCategory(category: Category): Promise<void> {
        throw new Error("Method not implemented.");
    }
}