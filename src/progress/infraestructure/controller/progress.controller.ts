import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infraestructure/guards/jwt-guard.guard';
import { MarkEndProgressDto } from '../dtos/mark-end-progress.dto';
import { OrmProgressMapper } from '../mappers/orm-progress.mapper';
import { OrmUserMapper } from 'src/user/infraestructure/mappers/orm-user.mapper';
import { LessonMapper } from 'src/course/infraestructure/mappers/lesson.mapper';
import { OrmProgressRepository } from '../repositories/orm-progress.repository';
import { DatabaseSingleton } from 'src/common/infraestructure/database/database.singleton';
import { TOrmCourseRepository } from 'src/course/infraestructure/repositories/TOrmCourse.repository';
import { OrmUserRepository } from 'src/user/infraestructure/repositories/orm-user.repository';
import { MarkEndProgressService } from 'src/progress/application/services/mark-end-progress.service';
import { ITransactionHandler } from 'src/common/domain/transaction-handler/transaction-handler.interface';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';
import { GetOneProgressService } from 'src/progress/application/services/get-one-progress.service';
import { JwtRequest } from 'src/common/infraestructure/types/jwt-request.type';

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

    private markEndProgressService: MarkEndProgressService;
    private getOneProgressService: GetOneProgressService;

    constructor() {
        this.markEndProgressService = new MarkEndProgressService(
            this.progressRepository,
            this.courseRepository,
            this.userRepository,
            this.transactionHandler
        );
        this.getOneProgressService = new GetOneProgressService(
            this.userRepository,
            this.progressRepository,
            this.courseRepository,
            this.transactionHandler
        );
    }

    @Post('mark/end')
    async markEnd(@Body() value: MarkEndProgressDto, @Request() req: JwtRequest) {
        return (await this.markEndProgressService.execute({...value, userId: req.user.tokenUser.id}))
    }

    @Get('one/:courseId')
    async getOneProgress(@Param('courseId', ParseUUIDPipe) courseId: string, @Request() req: JwtRequest) {
        return (await this.getOneProgressService.execute({courseId, userId: req.user.tokenUser.id}))
    }
    
    @Get('trending')
    async progressTrending(@Request() req: JwtRequest) {
        
    }
}
