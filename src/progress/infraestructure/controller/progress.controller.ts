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
import { LoggerDecorator } from 'src/common/application/aspects/loggerDecorator';
import { OrmProgressEntity } from '../entities/orm-entities/orm-progress.entity';
import { OrmCourseEntity } from 'src/course/infraestructure/entities/orm-entities/orm-course.entity';
import { ProfileProgressRequest } from 'src/progress/application/dtos/request/profile-progress.request';
import { ProfileProgressResponse } from 'src/progress/application/dtos/response/profile-progress.response';
import { ProfileProgressService } from 'src/progress/application/services/profile-progress.service';
import { HttpResponseHandler } from 'src/common/infraestructure/handlers/http-response.handler';
import { ExceptionMapper } from 'src/common/infraestructure/mappers/exception-mapper';
import { OdmProgressRepository } from '../repositories/odm-progress.repository';
import { Model } from 'mongoose';
import { OdmProgressEntity } from '../entities/odm-entities/odm-progress.entity';
import { OdmProgressMapper } from '../mappers/odm-progress.mapper';
import { OdmUserMapper } from 'src/user/infraestructure/mappers/odm-mappers/odm-user.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { OdmUserEntity } from 'src/user/infraestructure/entities/odm-entities/odm-user.entity';
import { OdmCourseEntity } from 'src/course/infraestructure/entities/odm-entities/odm-course.entity';
import { OdmLessonEntity } from 'src/course/infraestructure/entities/odm-entities/odm-lesson.entity';
import { OdmUserRespository } from 'src/user/infraestructure/repositories/odm-user.repository';
import { EventBus } from 'src/common/infraestructure/events/event-bus';
import { IEventPublisher } from 'src/common/application/events/event-publisher.abstract';
import { EventManagerSingleton } from 'src/common/infraestructure/events/event-manager/event-manager-singleton';
import { SaveProgressEvent } from '../events/save-progress.event';
import { ExceptionMapperDecorator } from 'src/common/application/aspects/exceptionMapperDecorator';
import { StartCourseProgressRequest } from 'src/progress/application/dtos/request/start-course-progress.request';
import { StartCourseProgressResponse } from 'src/progress/application/dtos/response/start-course-progress.response';
import { StartCourseProgressService } from 'src/progress/application/services/start-course-progress.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@ApiTags('Progress')
@Controller('progress')
export class ProgressController {

    private progressMapper: OrmProgressMapper = new OrmProgressMapper();
    private userMapper: OrmUserMapper = new OrmUserMapper();
    private odmProgressMapper: OdmProgressMapper;
    private odmUserMapper: OdmUserMapper;

    private readonly transactionHandler: ITransactionHandler = new TransactionHandler(
        PgDatabaseSingleton.getInstance().createQueryRunner()
    );

    private readonly progressRepository: OrmProgressRepository = new OrmProgressRepository(
        this.progressMapper, PgDatabaseSingleton.getInstance()
    );

    private readonly odmprogressRepository: OdmProgressRepository;
    private readonly odmUserRepository: OdmUserRespository;

    private readonly courseRepository: TOrmCourseRepository = new TOrmCourseRepository(
        PgDatabaseSingleton.getInstance()
    );

    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
        PgDatabaseSingleton.getInstance()
    );

    private readonly eventPublisher: IEventPublisher = EventManagerSingleton.getInstance();

    private readonly logger: ILogger = new NestLogger();

    private markEndProgressService: IService<MarkEndProgressRequest, MarkEndProgressResponse>;
    private getOneProgressService: IService<GetOneProgressRequest, GetOneProgressResponse>;
    private trendingProgressService: IService<TrendingProgressRequest, TrendingProgressResponse>;
    private coursesProgressService: IService<CoursesProgressRequest, CoursesProgressResponse>;
    private profileProgressService: IService<ProfileProgressRequest, ProfileProgressResponse>;
    private startCourseProgressService: IService<StartCourseProgressRequest, StartCourseProgressResponse>;

    constructor(@InjectModel('user') userModel: Model<OdmUserEntity>, @InjectModel('progress') progressModel: Model<OdmProgressEntity>, @InjectModel('course') courseModel: Model<OdmCourseEntity>, @InjectModel('lesson') lessonModel: Model<OdmLessonEntity>) {
        this.odmUserMapper = new OdmUserMapper();
        this.odmProgressMapper = new OdmProgressMapper(courseModel, userModel, lessonModel);

        this.odmUserRepository = new OdmUserRespository(this.odmUserMapper, userModel);
        this.odmprogressRepository = new OdmProgressRepository(progressModel, this.odmProgressMapper);

        this.eventPublisher.subscribe('ProgressRegister', [new SaveProgressEvent(this.odmprogressRepository)]);
        
        
        this.markEndProgressService = new ExceptionMapperDecorator(
            new LoggerDecorator(
                new ServiceDBLoggerDecorator(
                    new MarkEndProgressService(
                        this.progressRepository,
                        this.courseRepository,
                        this.odmUserRepository,
                        this.transactionHandler,
                        this.eventPublisher
                    ),
                    this.auditRepository
                ),
                this.logger
            )
        );
        this.getOneProgressService = new ExceptionMapperDecorator(
            new LoggerDecorator(
                new GetOneProgressService(
                    this.odmUserRepository,
                    this.odmprogressRepository,
                    this.courseRepository,
                    this.transactionHandler
                ),
                this.logger
            )
        );
        this.trendingProgressService = new ExceptionMapperDecorator(
            new LoggerDecorator(
                new TrendingProgressService(
                    this.odmUserRepository,
                    this.odmprogressRepository,
                    this.courseRepository
                ),
                this.logger
            )
        );
        this.coursesProgressService = new ExceptionMapperDecorator(
            new LoggerDecorator(
                new CoursesProgressService(
                    this.odmprogressRepository,
                    this.courseRepository,
                    this.odmUserRepository
                ),
                this.logger
            )
        );
        this.profileProgressService = new ExceptionMapperDecorator(
            new LoggerDecorator(
                new ProfileProgressService(
                    this.odmprogressRepository,
                    this.courseRepository,
                    this.odmUserRepository
                ),
                this.logger
            )
        );
        this.startCourseProgressService = new ExceptionMapperDecorator(
            new LoggerDecorator(
                new ServiceDBLoggerDecorator(
                    new StartCourseProgressService(
                        this.progressRepository,
                        this.odmUserRepository,
                        this.courseRepository,
                        this.transactionHandler,
                        this.eventPublisher
                    ),
                    this.auditRepository
                ),
                this.logger
            )
        )
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
        
        return response.Value;
    }

    @Get('one/:courseId')
    async getOneProgress(@Param('courseId', ParseUUIDPipe) courseId: string, @Request() req: JwtRequest) {
        const request = new GetOneProgressRequest(courseId, req.user.tokenUser.id);
        const response = await this.getOneProgressService.execute(request);

        return response.Value;
    }
    
    @Get('trending')
    async progressTrending(@Request() req: JwtRequest) {
        const request = new TrendingProgressRequest(req.user.tokenUser.id);
        const response = await this.trendingProgressService.execute(request);

        return response.Value;
    }

    @Get('courses')
    async progressCourses(@Query() queryDto: CoursesProgressDto, @Request() req: JwtRequest) {
        const request = new CoursesProgressRequest(req.user.tokenUser.id, queryDto.page, queryDto.perpage);
        const response = await this.coursesProgressService.execute(request);

        return response.Value.courseProgress;
    }

    @Get('profile')
    async progressProfile(@Request() req: JwtRequest) {
        const request = new ProfileProgressRequest(req.user.tokenUser.id);
        const response = await this.profileProgressService.execute(request);

        return response.Value;
    }

    @Get('start/:courseId')
    async startProgress(@Param('courseId', ParseUUIDPipe) courseId: string, @Request() req: JwtRequest) {
        const request = new StartCourseProgressRequest(courseId, req.user.tokenUser.id);
        const response = await this.startCourseProgressService.execute(request);
        return response.Value
    }
}
