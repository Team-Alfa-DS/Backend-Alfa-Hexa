import { Category } from "src/category/domain/Category";
import { CategoryRegister } from "src/category/domain/events/category-register.event";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";

export class SaveCategoryEvent implements IEventSubscriber<CategoryRegister> {
    private readonly odmCategoryRepository: ICategoryRepository;

    constructor(odmCategoryRepository: ICategoryRepository) {
        this.odmCategoryRepository = odmCategoryRepository;
    }

    async on(event: CategoryRegister): Promise<void> {
        
        const category = Category.create(
            event.id,
            event.name,
            event.icon
        );
        await this.odmCategoryRepository.saveCategory(category);
    }

}