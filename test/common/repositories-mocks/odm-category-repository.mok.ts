import { Result } from "src/common/domain/result-handler/result";
import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { CategoryName } from "src/category/domain/valueObjects/categoryName";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { CategoryIcon } from "src/category/domain/valueObjects/categoryIcon";


export class OdmCategoryRepositoryMock implements ICategoryRepository {
    private categories: Category[] = [];
    private readonly categoryOdm: OdmCategoryEntity[] = [
        {
            id: 'ca701b5b-0e6b-41a8-99d5-c1faeef6d5cf',
            icon: 'https://www.placeholder.com',
            name: 'Yoga'
        },
        {
            id: '4e5b218d-2c63-4e31-b52f-8ef6c10ff9b1',
            icon: 'https://www.placeholder.com',
            name: 'Fitness'
        },
        {
            id: 'a86bde99-78a3-48f2-9143-1e64c46d7d5e',
            icon: 'https://www.placeholder.com',
            name: 'Pilates'
        },
        {
            id: 'bfc1e4e4-75f5-4ef6-9f72-321f80f0d239',
            icon: 'https://www.placeholder.com',
            name: 'Running'
        },
        {
            id: '98a92c1a-120f-459f-b4b6-905e4136e45b',
            icon: 'https://www.placeholder.com',
            name: 'CrossFit'
        }
    ]

    async getCategoryById(id: CategoryId): Promise<Result<Category>> {
        const category = this.categoryOdm.find((c) => c.id === id.value);

        let cate = Category.create(
            CategoryId.create(category.id),
            CategoryName.create(category.name),
            CategoryIcon.create(category.icon)
        );

        return Result.success(cate) ;
    }

    async getAllCategory(page: number, perpage: number): Promise<Result<Category[]>> {
        const category = this.categoryOdm

        let categories = category.map((c) => {
            return Category.create(
                CategoryId.create(c.id),
                CategoryName.create(c.name),
                CategoryIcon.create(c.icon)
            );
        });

        return Result.success(categories);
    }

    async getCategoryByName(name: CategoryName): Promise<boolean> {
        const category = this.categoryOdm.find((c) => c.name === name.value);

        let cate = Category.create(
            CategoryId.create(category.id),
            CategoryName.create(category.name),
            CategoryIcon.create(category.icon)
        );

        return !!category;
    }

    async saveCategory(category: Category): Promise<void> {
        this.categories.push(category);
    }
}
