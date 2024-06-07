/* eslint-disable prettier/prettier */

import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
//import { GetAllCategorysService } from "src/category/application/services/getAllCategorys.service";
//import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { OrmCategoryRepository } from "../repositories/orm-category.repository";
import { OrmCategoryMapper } from "../mapper/orm-category.mapper";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
//import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { GetAllCategorysService } from "src/category/application/services/getAllCategorys.service";
import { GetCategoryByIdService } from "src/category/application/services/getCategoryById.service";
import { Category } from "src/category/domain/Category";



@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('category')
export class CategoryController {
    
    private categoryMapper: OrmCategoryMapper = new OrmCategoryMapper();
    private getAllCategorysService: GetAllCategorysService;
    private getCategoryByIdService: GetCategoryByIdService;
    private readonly categoryRepository: OrmCategoryRepository = new OrmCategoryRepository(
        this.categoryMapper,
        DatabaseSingleton.getInstance()
    );

    constructor() {
      this.getAllCategorysService = new GetAllCategorysService(this.categoryRepository);
      this.getCategoryByIdService = new GetCategoryByIdService(this.categoryRepository);
    }
    
    @ApiTags('Category')
    @Get("many")
    @ApiBearerAuth('token')
    @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
    getAllCategorys() {
    return this.getAllCategorysService.execute();
    }

    @ApiTags('Category')
    @Get("/:id")
    @ApiBearerAuth('token')
    @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
    getCategoryById(@Param('id') idCategory:string): Promise<Category> {

    return this.getCategoryByIdService.execute(idCategory);
    }
}