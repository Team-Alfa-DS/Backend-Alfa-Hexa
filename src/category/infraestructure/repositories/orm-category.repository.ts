/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { OrmCategoryEntity } from "../entities/orm-entities/orm-category.entity";
import { DataSource, Repository } from "typeorm";
import { Category } from "src/category/domain/Category";
import { IMapper } from "src/category/application/mapper/mapper.interface";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "src/common/domain/result-handler/result";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { OrmCategoryMapper } from "../mapper/orm-category.mapper";
//import { InjectRepository } from "@nestjs/typeorm";

export class OrmCategoryRepository extends Repository<OrmCategoryEntity> implements ICategoryRepository {

    private readonly ormCategoryMapper: OrmCategoryMapper;

    constructor(ormCategoryMapper: OrmCategoryMapper, dataSource: DataSource) {
        super(OrmCategoryEntity, dataSource.manager);
        this.ormCategoryMapper = ormCategoryMapper;
    }
    
    async getAllCategory(page: number=0, perpage: number=0): Promise<Result<Category[]>> {
        try {
          const result = await this.find(
            {
              take: page,
              skip: perpage
            }
          )
          
          let categories: Category[] = [];
          
          for (const category of result) {
            categories.push(this.ormCategoryMapper.toDomain(category))
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
          console.log({result})
          const domainCategory = (this.ormCategoryMapper.toDomain(result));
          console.log({domainCategory})
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