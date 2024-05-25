/* eslint-disable prettier/prettier */
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryEntity } from "../entities/category.entity";
import { DataSource, Repository } from "typeorm";
import { Category } from "src/category/domain/Category";
import { IMapper } from "src/category/application/mapper/mapper.interface";
import { InjectRepository } from "@nestjs/typeorm";

export class OrmCategoryRepository extends Repository<CategoryEntity> implements ICategoryRepository {

    private readonly ormCategoryMapper: IMapper<Category, CategoryEntity>;

    constructor(ormCategoryMapper: IMapper<Category, CategoryEntity>, dataSource: DataSource,  @InjectRepository(Category)
    private categoryRepository: Repository<Category>,) {
        super(CategoryEntity, dataSource.manager);
        this.ormCategoryMapper = ormCategoryMapper;
    }
    
    async getAllCategory(): Promise<Category[]> {
        const query = this.categoryRepository.createQueryBuilder('category');
        const categorys = await query.getMany();
        return categorys;
    }



}