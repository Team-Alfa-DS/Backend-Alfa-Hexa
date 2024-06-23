/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryEntity } from "../entities/category.entity";
import { DataSource, Repository } from "typeorm";
import { Category } from "src/category/domain/Category";
import { IMapper } from "src/category/application/mapper/mapper.interface";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "src/common/domain/result-handler/result";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
//import { InjectRepository } from "@nestjs/typeorm";

export class OrmCategoryRepository extends Repository<CategoryEntity> implements ICategoryRepository {

    private readonly ormCategoryMapper: IMapper<Category, CategoryEntity>;

    constructor(ormCategoryMapper: IMapper<Category, CategoryEntity>, dataSource: DataSource) {
        super(CategoryEntity, dataSource.manager);
        this.ormCategoryMapper = ormCategoryMapper;
    }
    
    async getAllCategory(page: number, perpage: number): Promise<Result<Category[]>> {
        try {
          const result = await this.find(
            {
              take: page,
              skip: perpage
            }
          )
          
          let categories: Category[] = [];
          
          for (const category of result) {
            categories.push( await this.ormCategoryMapper.toDomain(category))
          }
          
          return Result.success<Category[]>(categories, 200);
        } catch (error) {
          return Result.fail<Category[]>(new Error(error.message), error.code, error.message);
        }
      }

      async getCategoryById(idCategory: CategoryId): Promise<Result<Category>> {
        try {
          const result = await this.findOne({where: {id: idCategory.value}
          });
          return Result.success<Category>(await this.ormCategoryMapper.toDomain(result), 200);
        } catch (error) {
          return Result.fail<Category>(new Error(error.message), error.code, error.message);
        }
       }
    
    //async getAllCategory(): Promise<Category[]> {
        //const query = this.categoryRepository.createQueryBuilder('category');
        //const categorys = await query.getMany();
        //return categorys;
    //}



}