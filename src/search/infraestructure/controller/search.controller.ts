/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpException, ParseArrayPipe, ParseIntPipe, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infraestructure/guards/jwt-guard.guard';
import { OrmBlogRepository } from 'src/blog/infraestructure/repositories/ormBlog.repository';
import { ExceptionLoggerDecorator } from 'src/common/application/aspects/exceptionLoggerDecorator';
import { ServiceLoggerDecorator } from 'src/common/application/aspects/serviceLoggerDecorator';
import { IService } from 'src/common/application/interfaces/IService';
import { FsPromiseLogger } from 'src/common/infraestructure/adapters/FsPromiseLogger';
import { DatabaseSingleton } from 'src/common/infraestructure/database/database.singleton';
import { NestLogger } from 'src/common/infraestructure/logger/nest-logger';
import { TOrmCourseRepository } from 'src/course/infraestructure/repositories/TOrmCourse.repository';
import { SearchRequestDto } from 'src/search/application/dtos/request/search-request.dto';
import { SearchResponseDto } from 'src/search/application/dtos/response/search-response.dto';
import { SearchService } from 'src/search/application/services/search.service';
import { SearchTagService } from '../../application/services/search-tag.service';
import { ITransactionHandler } from 'src/common/domain/transaction-handler/transaction-handler.interface';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';
import { OrmTagRepository } from 'src/tag/infraestructure/repositories/orm-tag-repository';
import { SearchTagResponseDto } from 'src/search/application/dtos/response/search-tag-response.dto';
import { ITagRepository } from 'src/tag/application/ITagRepository';
import { OrmCategoryRepository } from 'src/category/infraestructure/repositories/orm-category.repository';
import { OrmCategoryMapper } from 'src/category/infraestructure/mapper/orm-category.mapper';
import { OrmTrainerRepository } from 'src/trainer/infraestructure/repositories/orm-trainer.repositorie';
import { OrmTrainerMapper } from 'src/trainer/infraestructure/mapper/orm-trainer.mapper';


@ApiTags('Search')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
    private searchService: IService<SearchRequestDto, SearchResponseDto>;
    private searchTagService: IService<SearchRequestDto, SearchTagResponseDto>;
    private transacctionHandler: ITransactionHandler;

    constructor() {
        const courseRepo = new TOrmCourseRepository(DatabaseSingleton.getInstance());
        const blogRepo = new OrmBlogRepository(DatabaseSingleton.getInstance());
        const tagRepo: ITagRepository = new OrmTagRepository(DatabaseSingleton.getInstance());
        const categoryRepo = new OrmCategoryRepository( new OrmCategoryMapper(), DatabaseSingleton.getInstance());
        const trainerRepo = new OrmTrainerRepository( new OrmTrainerMapper(), DatabaseSingleton.getInstance());
        const logger = new NestLogger();

        this.transacctionHandler = new TransactionHandler(
            DatabaseSingleton.getInstance().createQueryRunner()
        );

        this.searchService =  new ExceptionLoggerDecorator(
            new SearchService(courseRepo, blogRepo, trainerRepo, categoryRepo),
            logger
        );

        this.searchTagService = new ExceptionLoggerDecorator(
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
            throw new HttpException(result.Error, result.StatusCode);
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
            return result.Value;
        } else {
            throw new HttpException(result.Error, result.StatusCode);
        }
    }

}
