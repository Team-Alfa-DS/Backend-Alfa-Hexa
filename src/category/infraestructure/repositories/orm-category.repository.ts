/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { ICategoryCommandRepository } from "src/category/domain/repositories/category-repository.interface";
import { OrmCategoryEntity } from "../entities/orm-entities/orm-category.entity";
import { DataSource, Repository } from "typeorm";
import { Category } from "src/category/domain/Category";
import { IMapper } from "src/category/application/mapper/mapper.interface";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "src/common/domain/result-handler/result";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { OrmCategoryMapper } from "../mapper/orm-category.mapper";
import { CategoryName } from "src/category/domain/valueObjects/categoryName";
//import { InjectRepository } from "@nestjs/typeorm";

export class OrmCategoryRepository extends Repository<OrmCategoryEntity> implements ICategoryCommandRepository {

    private readonly ormCategoryMapper: OrmCategoryMapper;

    constructor(ormCategoryMapper: OrmCategoryMapper, dataSource: DataSource) {
        super(OrmCategoryEntity, dataSource.manager);
        this.ormCategoryMapper = ormCategoryMapper;
    }

    async saveCategory(category: Category): Promise<void> {
      const ormCategory = await this.ormCategoryMapper.toPersistence(category);
      await this.save(ormCategory);
    }


    getCategoryByName(name: CategoryName): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    
    async getAllCategory(page: number=0, perpage: number=5): Promise<Result<Category[]>> {
        try {
          const result = await this.find()
          
          let categories: Category[] = [];
          
          for (const category of result) {
            categories.push(await this.ormCategoryMapper.toDomain(category))
          }
          return Result.success<Category[]>(categories);
        } catch (error) {
          return Result.fail<Category[]>(new Error(error.message));
        }
      }

      async getCategoryById(idCategory: CategoryId): Promise<Result<Category>> {
        try {
          const result = await this.findOne({where: {id: idCategory.value}
          });
          const domainCategory = await (this.ormCategoryMapper.toDomain(result));
          return Result.success<Category>(domainCategory)
        } catch (error) {
          return Result.fail<Category>(new Error(error.message));
        }
       }
    
    //async getAllCategory(): Promise<Category[]> {
        //const query = this.categoryRepository.createQueryBuilder('category');
        //const categorys = await query.getMany();
        //return categorys;
    //}



}