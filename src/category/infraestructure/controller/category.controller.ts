import { Body, Controller, FileTypeValidator, Get, HttpException, Param, ParseFilePipe, ParseIntPipe, ParseUUIDPipe, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
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
import { ExceptionMapperDecorator } from "src/common/application/aspects/exceptionMapperDecorator";
import { OdmCategoryEntity } from '../entities/odm-entities/odm-category.entity';
import { OdmCategoryRepository } from "../repositories/odm-category.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OdmCategoryMapper } from "../mapper/odm-mapperCategory";
import { ManyCategoryDto } from "../dtos/many-category.dto";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateCategoryRequest } from "src/category/application/dtos/request/create-category.request";
import { CreateCategoryResponse } from "src/category/application/dtos/response/create-category.response";
import { CreateCategoryService } from "src/category/application/services/createCategory.service";
import { CloudinaryService } from "src/common/infraestructure/file-uploader/cloudinary-uploader";
import { IFileUploader } from "src/common/application/file-uploader/file-uploader.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { UuidGen } from "src/common/infraestructure/id-gen/uuid-gen";
import { EventManagerSingleton } from "src/common/infraestructure/events/event-manager/event-manager-singleton";
import { SaveCategoryEvent } from "../events/save-category.event";
import { CreateCategoryDto } from "../dtos/create-category.dto";


@ApiTags('Category')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
    
    private categoryMapper: OrmCategoryMapper = new OrmCategoryMapper();
    private getAllCategorysService: IService<GetAllCategoriesRequest, GetAllCategoriesResponse>;
    private getCategoryByIdService: IService<GetCategoryRequest, GetCategoryResponse>;
    private createCategoryService: IService<CreateCategoryRequest, CreateCategoryResponse>;
    private readonly categoryRepository: OrmCategoryRepository = new OrmCategoryRepository(
        this.categoryMapper,
        PgDatabaseSingleton.getInstance()
    );
    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
      PgDatabaseSingleton.getInstance()
    );
    private readonly OdmCategoryRepository: OdmCategoryRepository;
    private readonly eventPublisher = EventManagerSingleton.getInstance();
    private readonly logger: ILogger = new NestLogger();
    private readonly fileUploader: IFileUploader = new CloudinaryService();
    private readonly genId: IIdGen = new UuidGen();

    constructor(@InjectModel('category')categoryModel: Model<OdmCategoryEntity>) {
      this.OdmCategoryRepository = new OdmCategoryRepository(categoryModel, new OdmCategoryMapper());
      this.eventPublisher.subscribe('CategoryRegister', [new SaveCategoryEvent(this.OdmCategoryRepository)]);
      this.getAllCategorysService = new ExceptionMapperDecorator(
        new LoggerDecorator(
          new GetAllCategorysService(this.OdmCategoryRepository),
          this.logger
        )
      );
      this.getCategoryByIdService = new ExceptionMapperDecorator(
        new LoggerDecorator(
          new GetCategoryByIdService(this.OdmCategoryRepository),
          this.logger
        )
      );
      this.createCategoryService = new ExceptionMapperDecorator(
        new LoggerDecorator(
          new ServiceDBLoggerDecorator(
            new CreateCategoryService(
              this.OdmCategoryRepository,
              this.categoryRepository,
              this.fileUploader,
              this.genId,
              this.eventPublisher
            ),
            this.auditRepository
          ),
          this.logger
        )
      )
    }
    
    @Get("many")
    async getAllCategorys(@Query() getManyCategoriesDTO: ManyCategoryDto) {
      const request = new GetAllCategoriesRequest(getManyCategoriesDTO.page, getManyCategoriesDTO.perPage)
      const response = await this.getAllCategorysService.execute(request);
      if (!response.isSuccess) { throw response.Error }
      return response.Value.categories
    }

    @Get("/:id")
    async getCategoryById(@Param('id', ParseUUIDPipe) idCategory: string): Promise<GetCategoryResponse> {
      const request = new GetCategoryRequest(idCategory);
      const response = await this.getCategoryByIdService.execute(request);
      
      if (!response.isSuccess) { throw response.Error }
        
      return response.Value;
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('icon'))
    async createCategory(@UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({fileType: /(jpg|jpeg|png|webp)$/})]
      }),
    ) icon: Express.Multer.File, @Body() body: CreateCategoryDto) {
      const request = new CreateCategoryRequest(icon, body.name);
      const response = await this.createCategoryService.execute(request);
      
      if (!response.isSuccess) { throw response.Error }
        
      return response.Value;
    }
}