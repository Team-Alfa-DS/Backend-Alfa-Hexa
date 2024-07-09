/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpException, ParseArrayPipe, ParseIntPipe, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infraestructure/guards/jwt-guard.guard';
import { OrmBlogRepository } from 'src/blog/infraestructure/repositories/ormBlog.repository';
import { LoggerDecorator } from 'src/common/application/aspects/loggerDecorator';
import { ServiceLoggerDecorator } from 'src/common/application/aspects/serviceLoggerDecorator';
import { IService } from 'src/common/application/interfaces/IService';
import { FsPromiseLogger } from 'src/common/infraestructure/adapters/FsPromiseLogger';
import { PgDatabaseSingleton } from 'src/common/infraestructure/database/pg-database.singleton';
import { NestLogger } from 'src/common/infraestructure/logger/nest-logger';
import { TOrmCourseRepository } from 'src/course/infraestructure/repositories/TOrmCourse.repository';
import { SearchRequestDto } from 'src/search/application/dtos/request/search-request.dto';
import { SearchResponseDto } from 'src/search/application/dtos/response/search-response.dto';
import { SearchService } from 'src/search/application/services/search.service';
import { SearchTagService } from '../../application/services/search-tag.service';
import { ITransactionHandler } from 'src/common/domain/transaction-handler/transaction-handler.interface';
import { OrmTagRepository } from 'src/tag/infraestructure/repositories/orm-tag-repository';
import { SearchTagResponseDto } from 'src/search/application/dtos/response/search-tag-response.dto';
import { ITagRepository } from 'src/tag/application/ITagRepository';
import { OrmCategoryRepository } from 'src/category/infraestructure/repositories/orm-category.repository';
import { OrmCategoryMapper } from 'src/category/infraestructure/mapper/orm-category.mapper';
import { OrmTrainerRepository } from 'src/trainer/infraestructure/repositories/orm-trainer.repositorie';
import { OrmTrainerMapper } from 'src/trainer/infraestructure/mapper/orm-trainer.mapper';
import { ExceptionMapper } from 'src/common/infraestructure/mappers/exception-mapper';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';


@ApiTags('Search')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
    private searchService: IService<SearchRequestDto, SearchResponseDto>;
    private searchTagService: IService<SearchRequestDto, SearchTagResponseDto>;
    private transacctionHandler: ITransactionHandler;
    private trainerMapper: OrmTrainerMapper = new OrmTrainerMapper();

    constructor() {
        const courseRepo = new TOrmCourseRepository(PgDatabaseSingleton.getInstance());
        const blogRepo = new OrmBlogRepository(PgDatabaseSingleton.getInstance());
        const tagRepo: ITagRepository = new OrmTagRepository(PgDatabaseSingleton.getInstance());
        const categoryRepo = new OrmCategoryRepository( new OrmCategoryMapper(), PgDatabaseSingleton.getInstance());
        const trainerRepo = new OrmTrainerRepository( this.trainerMapper, PgDatabaseSingleton.getInstance());
        const logger = new NestLogger();

        this.transacctionHandler = new TransactionHandler(
            PgDatabaseSingleton.getInstance().createQueryRunner()
        );

        this.searchService =  new LoggerDecorator(
            new SearchService(courseRepo, blogRepo, trainerRepo, categoryRepo),
            logger
        );

        this.searchTagService = new LoggerDecorator(
            new SearchTagService(tagRepo,this.transacctionHandler),
            logger
        );
    }


    @Get( "/all" )
    @ApiCreatedResponse({
        description: 'se realizo la busqueda correctamente',
    })
    @ApiBadRequestResponse({
        description: 'No se pudo realizar la busqueda'
    })
    @ApiQuery({name: 'term', required:false})
    @ApiQuery({name: 'tag', required:false})
    async searchAll(
        @Request() req, 
        @Query('page', ParseIntPipe,) page: number,
        @Query('perpage', ParseIntPipe) perPage: number,
        @Query('term') term?: string, 
        @Query('tag', new ParseArrayPipe({items: String, separator: ',', optional: true})) tag?: string[]
    ) {
        const request = new SearchRequestDto(page, perPage, term, tag);
        const result = await this.searchService.execute(request);

        if (result.isSuccess) {
            return result.Value;
        } else {
            // throw new HttpException(result.Error, result.StatusCode);
            throw ExceptionMapper.toHttp(result.Error);
        }
    }

    @Get( "/popular/tags" )
    async searchPopularTags(
        @Request() req,
        @Query('page', ParseIntPipe,) page: number,
        @Query('perpage', ParseIntPipe) perPage: number,
    ) {
        const request = new SearchRequestDto(page, perPage);
        const result = await this.searchTagService.execute(request);

        if (result.isSuccess) {
            return result.Value.tagNames;
        } else {
            // throw new HttpException(result.Error, result.StatusCode);
            throw ExceptionMapper.toHttp(result.Error);
        }
    }

}
