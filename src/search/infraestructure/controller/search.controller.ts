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
import { TOrmCourseRepository } from 'src/course/infraestructure/repositories/TOrmCourse.repository';
import { SearchRequestDto } from 'src/search/application/dtos/request/search-request.dto';
import { SearchResponseDto } from 'src/search/application/dtos/response/search-response.dto';
import { SearchService } from 'src/search/application/services/search.service';


@ApiTags('Search')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
    private searchService: IService<SearchRequestDto, SearchResponseDto>;

    constructor() {
        const courseRepo = new TOrmCourseRepository(DatabaseSingleton.getInstance());
        const blogRepo = new OrmBlogRepository(DatabaseSingleton.getInstance());

        this.searchService =  new ExceptionLoggerDecorator(
            new ServiceLoggerDecorator(
              new SearchService(courseRepo, blogRepo), new FsPromiseLogger("serviceUse.log")));
    }


    @Get()
    @ApiCreatedResponse({
        description: 'se realizo la busqueda correctamente',
    })
    @ApiBadRequestResponse({
        description: 'No se pudo realizar la busqueda'
    })
    @ApiQuery({name: 'term', required:false})
    @ApiQuery({name: 'tag', required:false})
    async search(
        @Request() req, 
        @Query('page', ParseIntPipe,) page: number,
        @Query('perpage', ParseIntPipe) perpage: number,
        @Query('term') term?: string, 
        @Query('tag', new ParseArrayPipe({items: String, separator: ',', optional: true})) tag?: string[]
    ) {
        const request = new SearchRequestDto(page, perpage, term, tag);
        const result = await this.searchService.execute(request);

        if (result.isSuccess) {
            return result.Value;
        } else {
            throw new HttpException(result.Error, result.StatusCode);
        }
    }
}