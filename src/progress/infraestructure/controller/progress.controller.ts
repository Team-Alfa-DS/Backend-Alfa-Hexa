import { Body, Controller, Get, HttpException, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infraestructure/guards/jwt-guard.guard';
import { MarkEndProgressDto } from '../dtos/mark-end-progress.dto';
import { OrmProgressMapper } from '../mappers/orm-progress.mapper';
import { OrmUserMapper } from 'src/user/infraestructure/mappers/orm-mappers/orm-user.mapper';
import { OrmProgressRepository } from '../repositories/orm-progress.repository';
import { PgDatabaseSingleton } from 'src/common/infraestructure/database/pg-database.singleton';
import { TOrmCourseRepository } from 'src/course/infraestructure/repositories/TOrmCourse.repository';
import { OrmUserRepository } from 'src/user/infraestructure/repositories/orm-user.repository';
import { MarkEndProgressService } from 'src/progress/application/services/mark-end-progress.service';
import { ITransactionHandler } from 'src/common/domain/transaction-handler/transaction-handler.interface';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';
import { GetOneProgressService } from 'src/progress/application/services/get-one-progress.service';
import { JwtRequest } from 'src/common/infraestructure/types/jwt-request.type';
import { TrendingProgressService } from 'src/progress/application/services/trending-progress.service';
import { OrmAuditRepository } from 'src/common/infraestructure/repository/orm-audit.repository';
import { IService } from 'src/common/application/interfaces/IService';
import { MarkEndProgressRequest } from 'src/progress/application/dtos/request/mark-end-progress.request.dto';
import { MarkEndProgressResponse } from 'src/progress/application/dtos/response/mark-end-progress.response';
import { GetOneProgressRequest } from 'src/progress/application/dtos/request/get-one-progress.request.dto';
import { GetOneProgressResponse } from 'src/progress/application/dtos/response/get-one-progress.response';
import { TrendingProgressRequest } from 'src/progress/application/dtos/request/trending-progress.request.dto';
import { TrendingProgressResponse } from 'src/progress/application/dtos/response/trending-progress.response.dto';
import { ServiceDBLoggerDecorator } from 'src/common/application/aspects/serviceDBLoggerDecorator';
import { CoursesProgressRequest } from 'src/progress/application/dtos/request/courses-progress.request';
import { CoursesProgressResponse } from 'src/progress/application/dtos/response/courses-progress.response';
import { CoursesProgressService } from 'src/progress/application/services/courses-progress.service';
import { CoursesProgressDto } from '../dtos/courses-progress.dto';
import { ILogger } from 'src/common/application/logger/logger.interface';
import { NestLogger } from 'src/common/infraestructure/logger/nest-logger';
import { ExceptionLoggerDecorator } from 'src/common/application/aspects/exceptionLoggerDecorator';
import { OrmProgressEntity } from '../entities/orm-entities/orm-progress.entity';
import { OrmCourseEntity } from 'src/course/infraestructure/entities/orm-entities/orm-course.entity';
import { ProfileProgressRequest } from 'src/progress/application/dtos/request/profile-progress.request';
import { ProfileProgressResponse } from 'src/progress/application/dtos/response/profile-progress.response';
import { ProfileProgressService } from 'src/progress/application/services/profile-progress.service';
import { HttpResponseHandler } from 'src/common/infraestructure/handlers/http-response.handler';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@ApiTags('Progress')
@Controller('progress')
export class ProgressController {

    private progressMapper: OrmProgressMapper = new OrmProgressMapper();
    private userMapper: OrmUserMapper = new OrmUserMapper();

    private readonly transactionHandler: ITransactionHandler = new TransactionHandler(
        PgDatabaseSingleton.getInstance().createQueryRunner()
    );

    private readonly progressRepository: OrmProgressRepository = new OrmProgressRepository(
        this.progressMapper, PgDatabaseSingleton.getInstance()
    );

    private readonly courseRepository: TOrmCourseRepository = new TOrmCourseRepository(
        PgDatabaseSingleton.getInstance()
    );

    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper, PgDatabaseSingleton.getInstance()
    );

    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
        PgDatabaseSingleton.getInstance()
    );

    private readonly logger: ILogger = new NestLogger();

    private markEndProgressService: IService<MarkEndProgressRequest, MarkEndProgressResponse>;
    private getOneProgressService: IService<GetOneProgressRequest, GetOneProgressResponse>;
    private trendingProgressService: IService<TrendingProgressRequest, TrendingProgressResponse>;
    private coursesProgressService: IService<CoursesProgressRequest, CoursesProgressResponse>;
    private profileProgressService: IService<ProfileProgressRequest, ProfileProgressResponse>;

    constructor() {
        this.markEndProgressService = new ExceptionLoggerDecorator(
            new ServiceDBLoggerDecorator(
                new MarkEndProgressService(
                    this.progressRepository,
                    this.courseRepository,
                    this.userRepository,
                    this.transactionHandler
                ),
                this.auditRepository
            ),
            this.logger
        );
        this.getOneProgressService = new ExceptionLoggerDecorator(
            new GetOneProgressService(
                this.userRepository,
                this.progressRepository,
                this.courseRepository,
                this.transactionHandler
            ),
            this.logger
        );
        this.trendingProgressService = new ExceptionLoggerDecorator(
            new TrendingProgressService(
                this.userRepository,
                this.progressRepository,
                this.courseRepository,
                this.transactionHandler
            ),
            this.logger
        );
        this.coursesProgressService = new ExceptionLoggerDecorator(
            new CoursesProgressService(
                this.progressRepository,
                this.courseRepository,
                this.userRepository,
                this.transactionHandler
            ),
            this.logger
        );
        this.profileProgressService = new ExceptionLoggerDecorator(
            new ProfileProgressService(
                this.progressRepository,
                this.courseRepository,
                this.userRepository,
                this.transactionHandler
            ),
            this.logger
        );
    }

    @Post('mark/end')
    @ApiCreatedResponse({
        description: 'se guardo el progreso correctamente',
        // type: OrmProgressEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se pudo guardar el progreso. Intente de nuevo'
    })
    async markEnd(@Body() value: MarkEndProgressDto, @Request() req: JwtRequest) {
        const request = new MarkEndProgressRequest(value.courseId, value.lessonId, req.user.tokenUser.id, value.markAsCompleted, value.time, value.totalTime);
        const response = await this.markEndProgressService.execute(request);
        
        if (response.isSuccess) return response.Value;
        HttpResponseHandler.HandleException(response.StatusCode, response.Message, response.Error);
    }

    @Get('one/:courseId')
    @ApiCreatedResponse({
        description: 'se retorno el curso correctamente',
        // type: OrmCourseEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se pudo encontrar un curso con esa id. Intente de nuevo'
    })
    async getOneProgress(@Param('courseId', ParseUUIDPipe) courseId: string, @Request() req: JwtRequest) {
        const request = new GetOneProgressRequest(courseId, req.user.tokenUser.id);
        const response = await this.getOneProgressService.execute(request);

        if (response.isSuccess) return response.Value;
        HttpResponseHandler.HandleException(response.StatusCode, response.Message, response.Error);
    }
    
    @Get('trending')
    @ApiCreatedResponse({
        description: 'se retorno el ultimo curso correctamente',
        
    })
    @ApiBadRequestResponse({
        description: 'No se pudo retornar el ultimo curso. Intente de nuevo'
    })
    async progressTrending(@Request() req: JwtRequest) {
        const request = new TrendingProgressRequest(req.user.tokenUser.id);
        const response = await this.trendingProgressService.execute(request);

        if (response.isSuccess) return response.Value;
        HttpResponseHandler.HandleException(response.StatusCode, response.Message, response.Error);
    }

    @Get('courses')
    async progressCourses(@Query() queryDto: CoursesProgressDto, @Request() req: JwtRequest) {
        const request = new CoursesProgressRequest(req.user.tokenUser.id, queryDto.page, queryDto.perpage);
        const response = await this.coursesProgressService.execute(request);

        if (response.isSuccess) return response.Value.courseProgress;
        HttpResponseHandler.HandleException(response.StatusCode, response.Message, response.Error);
    }

    @Get('profile')
    async progressProfile(@Request() req: JwtRequest) {
        const request = new ProfileProgressRequest(req.user.tokenUser.id);
        const response = await this.profileProgressService.execute(request);

        if (response.isSuccess) return response.Value;
        HttpResponseHandler.HandleException(response.StatusCode, response.Message, response.Error);
    }
}
