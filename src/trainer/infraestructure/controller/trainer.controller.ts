import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PgDatabaseSingleton } from 'src/common/infraestructure/database/pg-database.singleton';
import { FindOneTrainerService } from 'src/trainer/application/service/findOneTrainer.service';
import { OrmTrainerMapper } from '../mapper/orm-trainer.mapper';
import { OrmTrainerRepository } from '../repositories/orm-trainer.repositorie';
import { FollowTrainerService } from 'src/trainer/application/service/followTrainer.service';
import { IService } from 'src/common/application/interfaces/IService';
import { FindOneTrainerRequest } from 'src/trainer/application/dto/request/find-one-trainer.request';
import { FindOneTrainerResponse } from 'src/trainer/application/dto/response/find-one-trainer.response';
import { FollowTrainerRequest } from 'src/trainer/application/dto/request/follow-trainer.request';
import { ServiceDBLoggerDecorator } from 'src/common/application/aspects/serviceDBLoggerDecorator';
import { OrmAuditRepository } from 'src/common/infraestructure/repository/orm-audit.repository';
import { FollowTrainerResponse } from 'src/trainer/application/dto/response/follow-trainer.response';
import { JwtRequest } from 'src/common/infraestructure/types/jwt-request.type';
import { JwtAuthGuard } from 'src/auth/infraestructure/guards/jwt-guard.guard';
import { ILogger } from 'src/common/application/logger/logger.interface';
import { NestLogger } from 'src/common/infraestructure/logger/nest-logger';
import { LoggerDecorator } from 'src/common/application/aspects/loggerDecorator';
import { OrmTrainerEntity } from '../entities/orm-entities/orm-trainer.entity';
import { GetManyTrainerQueryDto } from '../dto/GetTrainerQuerydto';
import { FindAllTrainersService, GetAllTrainersRequest, GetAllTrainersResponse} from 'src/trainer/application/service/findAllTrainer.service';
import { GetUser } from '../decorador/decoradorGetUser';
import { User } from 'src/user/domain/user';
import { get } from 'http';
import { ExceptionMapper } from 'src/common/infraestructure/mappers/exception-mapper';
import { CountUserFollowRequest } from 'src/trainer/application/dto/request/count-user-follow-trainer.request';
import { CountUserFollowResponse } from 'src/trainer/application/dto/response/count-user-follow-trainer.response';
import { CountUserFollowTrainerService } from 'src/trainer/application/service/count-user-follow-trainer.service';
import { OdmTrainerEntity } from '../entities/odm-entities/odm-trainer.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMapper } from 'src/common/application/mappers/mapper.interface';
import { Trainer } from 'src/trainer/domain/trainer';
import { IOdmTrainerRepository } from 'src/trainer/domain/repositories/odm-trainer-repository.interface';
import { OdmTrainerMapper } from '../mapper/odm-trainer.mapper';
import { OdmCourseEntity } from 'src/course/infraestructure/entities/odm-entities/odm-course.entity';
import { OdmBlogEntity } from 'src/blog/infraestructure/entities/odm-entities/odm-blog.entity';
import { OdmTrainerRepository } from '../repositories/odm-trainer.repository';
import { OdmUserEntity } from 'src/user/infraestructure/entities/odm-entities/odm-user.entity';
import { IEventPublisher } from 'src/common/application/events/event-publisher.abstract';
import { EventManagerSingleton } from 'src/common/infraestructure/events/event-manager/event-manager-singleton';
import { UpdateUsersTrainersEvent } from '../events/update-users-trainer.event';
import { ExceptionDecorator } from 'src/common/application/aspects/exceptionDecorator';

@ApiTags('Trainer')
@ApiBearerAuth()

@ApiUnauthorizedResponse({
  description: 'Acceso no autorizado, no se pudo encontrar el Token',
})
@Controller('trainer')
export class TrainerController {

  private trainerMapper: OrmTrainerMapper = new OrmTrainerMapper();
  private readonly trainerRepository: OrmTrainerRepository =
    new OrmTrainerRepository(
      this.trainerMapper,
      PgDatabaseSingleton.getInstance(),
    );

    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
      PgDatabaseSingleton.getInstance()
    );
    private odmTrainerMapper: IMapper<Trainer, OdmTrainerEntity>;
    private readonly odmTrainerRepository: IOdmTrainerRepository;

    private readonly eventPublisher: IEventPublisher = EventManagerSingleton.getInstance();
    private readonly logger: ILogger = new NestLogger();

    private findOneTrainerService: IService<FindOneTrainerRequest, FindOneTrainerResponse>;
    private followTrainerService: IService<FollowTrainerRequest, FollowTrainerResponse>;
    private findAllTrainersService: IService<GetAllTrainersRequest, GetAllTrainersResponse>;
    private countUserFollowTrainerService: IService<CountUserFollowRequest, CountUserFollowResponse>;

  constructor(@InjectModel('trainer') trainerModel: Model<OdmTrainerEntity>, @InjectModel('course') courseModel: Model<OdmCourseEntity>, @InjectModel('blog') blogModel: Model<OdmBlogEntity>, @InjectModel('user') userModel: Model<OdmUserEntity>) {

    this.odmTrainerMapper = new OdmTrainerMapper(courseModel, blogModel, userModel);
    this.odmTrainerRepository = new OdmTrainerRepository(trainerModel, this.odmTrainerMapper, userModel);
    this.eventPublisher.subscribe('TrainerUsersUpdated', [new UpdateUsersTrainersEvent(this.odmTrainerRepository)]);

    this.findOneTrainerService = new ExceptionDecorator(
      new LoggerDecorator(
        new FindOneTrainerService(
          this.odmTrainerRepository,
          //this.transactionHandler
        ),
        this.logger
      )
    );
    this.followTrainerService = new ExceptionDecorator(
      new LoggerDecorator(
        new ServiceDBLoggerDecorator(
          new FollowTrainerService(
            this.trainerRepository,
            this.odmTrainerRepository,
            this.eventPublisher
            //this.transactionHandler
          ),
          this.auditRepository
        ),
        this.logger
      )
    );
    this.countUserFollowTrainerService = new ExceptionDecorator(
      new LoggerDecorator(
        new CountUserFollowTrainerService(
          this.odmTrainerRepository
        ),
        this.logger
      )
    );
    this.findAllTrainersService = new ExceptionDecorator(
      new LoggerDecorator(
        new FindAllTrainersService(
          this.odmTrainerRepository
        ),
        this.logger
      )
    );
  }

  @Get('one/:id')
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  async getTrainerById(@Param('id', ParseUUIDPipe) trainerId: string, @Request() req: JwtRequest) {
    const request = new FindOneTrainerRequest(trainerId, req.user.tokenUser.id);
    const oneTrainer = await this.findOneTrainerService.execute(request);
    
    return oneTrainer.Value;
  }
  

  @Post('/toggle/follow/:id')
  @ApiParam({name:'trainer', required: true})
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  async followTrainer(
    @Request() req: JwtRequest,
    @Param('id', ParseUUIDPipe) idTrainer: string,
  ) {
    const request = new FollowTrainerRequest(idTrainer, req.user.tokenUser.id);
    const follow = await this.followTrainerService.execute(request);
    
    return follow.Value;
  }


  @Get('/many')
  @ApiQuery({name: 'filter', required:false})
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  async getAllTrainers(@Query() GetManyTrainerQueryDto: GetManyTrainerQueryDto, @Request() req: JwtRequest) {
    const request = new GetAllTrainersRequest(
      GetManyTrainerQueryDto.userfollow,
      req.user.tokenUser.id,
      GetManyTrainerQueryDto.page,  
      GetManyTrainerQueryDto.perpage
    );
    const result = await this.findAllTrainersService.execute(request);
    
    return result.Value.trainers;
  }

  @Get('/user/follow')
  @UseGuards(JwtAuthGuard)
  async getCountFollowers (@Request() req: JwtRequest) {
    const request = new CountUserFollowRequest(req.user.tokenUser.id);
    const result = await this.countUserFollowTrainerService.execute(request);

    return result.Value;
  }
}


