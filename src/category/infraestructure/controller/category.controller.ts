
import { Controller, Get, HttpException, Param, ParseIntPipe, ParseUUIDPipe, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
//import { GetAllCategorysService } from "src/category/application/services/getAllCategorys.service";
//import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { OrmCategoryRepository } from "../repositories/orm-category.repository";
import { OrmCategoryMapper } from "../mapper/orm-category.mapper";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
//import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
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
import { LoggerDecorator } from "src/common/application/aspects/loggerDecorator";
import { ILogger } from "src/common/application/logger/logger.interface";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { OrmCategoryEntity } from "../entities/orm-entities/orm-category.entity";
import { ExceptionMapper } from "src/common/infraestructure/mappers/exception-mapper";
import { ExceptionDecorator } from "src/common/application/aspects/exceptionDecorator";


@ApiTags('Category')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('category')
export class CategoryController {
    
    private categoryMapper: OrmCategoryMapper = new OrmCategoryMapper();
    private getAllCategorysService: IService<GetAllCategoriesRequest, GetAllCategoriesResponse>;
    private getCategoryByIdService: IService<GetCategoryRequest, GetCategoryResponse>;
    private readonly categoryRepository: OrmCategoryRepository = new OrmCategoryRepository(
        this.categoryMapper,
        PgDatabaseSingleton.getInstance()
    );
    private readonly logger: ILogger = new NestLogger();

    constructor() {
      this.getAllCategorysService = new ExceptionDecorator(
        new LoggerDecorator(
          new GetAllCategorysService(this.categoryRepository),
          this.logger
        )
      );
      this.getCategoryByIdService = new ExceptionDecorator(
        new LoggerDecorator(
          new GetCategoryByIdService(this.categoryRepository),
          this.logger
        )
      );
    }
    
    @Get("many")
    @ApiCreatedResponse({
      description: 'se retornaron todas las categorias de manera exitosa',
      type: OrmCategoryEntity,
  })
  @ApiBadRequestResponse({
      description: 'No existen categorias. Agregue'
  })
    async getAllCategorys(@Query() getManyCategoriesDTO: GetAllCategoriesRequest): Promise<GetAllCategoriesResponse> {
      const response = await this.getAllCategorysService.execute(getManyCategoriesDTO);
      return response.Value
    }

    @Get("/:id")
    @ApiCreatedResponse({
      description: 'se retorno la categoria de manera exitosa',
      type: OrmCategoryEntity,
    })
    @ApiBadRequestResponse({
      description: 'No existe una categoria con esa id'
    })
    async getCategoryById(@Param('id', ParseUUIDPipe) idCategory: string): Promise<GetCategoryResponse> {
      const request = new GetCategoryRequest(idCategory);
      const response = await this.getCategoryByIdService.execute(request);
      return response.Value
    }
}