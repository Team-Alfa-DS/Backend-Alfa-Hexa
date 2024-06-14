import { Body, Controller, Get, HttpException, Param, ParseUUIDPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infraestructure/guards/jwt-guard.guard';
import { MarkEndProgressDto } from '../dtos/mark-end-progress.dto';
import { OrmProgressMapper } from '../mappers/orm-progress.mapper';
import { OrmUserMapper } from 'src/user/infraestructure/mappers/orm-user.mapper';
import { OrmProgressRepository } from '../repositories/orm-progress.repository';
import { DatabaseSingleton } from 'src/common/infraestructure/database/database.singleton';
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
import { ProgressEntity } from '../entities/progress.entity';
import { CourseEntity } from 'src/course/infraestructure/entities/course.entity';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@ApiTags('Progress')
@Controller('progress')
export class ProgressController {

    private progressMapper: OrmProgressMapper = new OrmProgressMapper();
    private userMapper: OrmUserMapper = new OrmUserMapper();

    private readonly transactionHandler: ITransactionHandler = new TransactionHandler(
        DatabaseSingleton.getInstance().createQueryRunner()
    );

    private readonly progressRepository: OrmProgressRepository = new OrmProgressRepository(
        this.progressMapper, DatabaseSingleton.getInstance()
    );

    private readonly courseRepository: TOrmCourseRepository = new TOrmCourseRepository(
        DatabaseSingleton.getInstance()
    );

    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper, DatabaseSingleton.getInstance()
    );

    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
        DatabaseSingleton.getInstance()
    );

    private markEndProgressService: IService<MarkEndProgressRequest, MarkEndProgressResponse>;
    private getOneProgressService: IService<GetOneProgressRequest, GetOneProgressResponse>;
    private trendingProgressService: IService<TrendingProgressRequest, TrendingProgressResponse>;

    constructor() {
        this.markEndProgressService = new ServiceDBLoggerDecorator(
            new MarkEndProgressService(
                this.progressRepository,
                this.courseRepository,
                this.userRepository,
                this.transactionHandler
            ),
            this.auditRepository
        );
        this.getOneProgressService = new ServiceDBLoggerDecorator(
            new GetOneProgressService(
                this.userRepository,
                this.progressRepository,
                this.courseRepository,
                this.transactionHandler
            ),
            this.auditRepository
        );
        this.trendingProgressService = new ServiceDBLoggerDecorator(
            new TrendingProgressService(
                this.userRepository,
                this.progressRepository,
                this.courseRepository,
                this.transactionHandler
            ),
            this.auditRepository
        );
    }

    @Post('mark/end')
    @ApiCreatedResponse({
        description: 'se guardo el progreso correctamente',
        type: ProgressEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se pudo guardar el progreso. Intente de nuevo'
    })
    async markEnd(@Body() value: MarkEndProgressDto, @Request() req: JwtRequest) {
        const request = new MarkEndProgressRequest(value.courseId, value.lessonId, req.user.tokenUser.id, value.markAsCompleted, value.time);
        const response = await this.markEndProgressService.execute(request);
        
        if (response.isSuccess) return response.Value;
        throw new HttpException(response.Message, response.StatusCode);
    }

    @Get('one/:courseId')
    @ApiCreatedResponse({
        description: 'se retorno el curso correctamente',
        type: CourseEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se pudo encontrar un curso con esa id. Intente de nuevo'
    })
    async getOneProgress(@Param('courseId', ParseUUIDPipe) courseId: string, @Request() req: JwtRequest) {
        const request = new GetOneProgressRequest(courseId, req.user.tokenUser.id);
        const response = await this.getOneProgressService.execute(request);

        if (response.isSuccess) return response.Value;
        throw new HttpException(response.Message, response.StatusCode); 
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
        throw new HttpException(response.Message, response.StatusCode);
    }
}
