/* eslint-disable prettier/prettier */
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryEntity } from "../entities/category.entity";
import { DataSource, Repository } from "typeorm";
import { Category } from "src/category/domain/Category";
import { IMapper } from "src/category/application/mapper/mapper.interface";
import { OrmCategoryMapper } from "../mapper/orm-category.mapper";
import { HttpException, HttpStatus } from "@nestjs/common";
//import { InjectRepository } from "@nestjs/typeorm";

export class OrmCategoryRepository extends Repository<CategoryEntity> implements ICategoryRepository {

    private readonly ormCategoryMapper: IMapper<Category, CategoryEntity>;

    constructor(ormCategoryMapper: IMapper<Category, CategoryEntity>, dataSource: DataSource) {
        super(CategoryEntity, dataSource.manager);
        this.ormCategoryMapper = ormCategoryMapper;
    }
    
    async getAllCategory(): Promise<Category[]> {
        try {
          const result = await this.find({})
          
          // console.log('Debug: ', result);
          const categorys: any = OrmCategoryMapper.arrayToDomain(result);
          console.log(categorys);
          
          return categorys;
        } catch (error) {
          throw new HttpException("No se encontraron categorias", HttpStatus.BAD_REQUEST);
        }
      }
    
    //async getAllCategory(): Promise<Category[]> {
        //const query = this.categoryRepository.createQueryBuilder('category');
        //const categorys = await query.getMany();
        //return categorys;
    //}



}