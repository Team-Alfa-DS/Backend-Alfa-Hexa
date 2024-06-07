/* eslint-disable prettier/prettier */

import { Controller, Get, HttpException, Param, ParseIntPipe, Query } from "@nestjs/common";
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
import { OrmAuditRepository } from "src/common/infraestructure/repository/orm-audit.repository";
import { ServiceDBLoggerDecorator } from "src/common/application/aspects/serviceDBLoggerDecorator";
import { IService } from "src/common/application/interfaces/IService";
import { GetAllCategoriesRequest } from "src/category/application/dtos/request/get-all-categories.request";
import { GetAllCategoriesResponse } from "src/category/application/dtos/response/get-all-categories.response";
import { GetCategoryRequest } from "src/category/application/dtos/request/get-category.request";
import { GetCategoryResponse } from "src/category/application/dtos/response/get-category.response";


@ApiTags('Category')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('category')
export class CategoryController {
    
    private categoryMapper: OrmCategoryMapper = new OrmCategoryMapper();
    private getAllCategorysService: IService<GetAllCategoriesRequest, GetAllCategoriesResponse>;
    private getCategoryByIdService: IService<GetCategoryRequest, GetCategoryResponse>;
    private readonly categoryRepository: OrmCategoryRepository = new OrmCategoryRepository(
        this.categoryMapper,
        DatabaseSingleton.getInstance()
    );

    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
      DatabaseSingleton.getInstance()
    );

    constructor() {
      this.getAllCategorysService = new ServiceDBLoggerDecorator(
        new GetAllCategorysService(this.categoryRepository),
        this.auditRepository
      );
      this.getCategoryByIdService = new ServiceDBLoggerDecorator(
        new GetCategoryByIdService(this.categoryRepository),
        this.auditRepository
      );
    }
    
    @Get("many")
    @ApiBearerAuth('token')
    @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
    async getAllCategorys(@Query('page', ParseIntPipe) page: number, @Query('perpage', ParseIntPipe) perpage: number) {
      const request = new GetAllCategoriesRequest(page, perpage);
      const response = await this.getAllCategorysService.execute(request);
      if (response.isSuccess) return response.Value
      throw new HttpException(response.Message, response.StatusCode);
    }

    @Get("/:id")
    @ApiBearerAuth('token')
    @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
    async getCategoryById(@Param('id') idCategory: string): Promise<Category> {
      const request = new GetCategoryRequest(idCategory);
      const response = await this.getCategoryByIdService.execute(request);
      if (response.isSuccess) return response.Value
      throw new HttpException(response.Message, response.StatusCode);
    }
}