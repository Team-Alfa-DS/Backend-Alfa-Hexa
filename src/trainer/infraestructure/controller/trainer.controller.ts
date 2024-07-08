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
import { ExceptionLoggerDecorator } from 'src/common/application/aspects/exceptionLoggerDecorator';
import { OrmTrainerEntity } from '../entities/orm-entities/orm-trainer.entity';
import { GetManyTrainerQueryDto } from '../Dto/GetTrainerQuerydto';
import { FindAllTrainersService, GetAllTrainersRequest, GetAllTrainersResponse} from 'src/trainer/application/service/findAllTrainer.service';
import { GetUser } from '../decorador/decoradorGetUser';
import { User } from 'src/user/domain/user';
import { get } from 'http';
import { ExceptionMapper } from 'src/common/infraestructure/mappers/exception-mapper';

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
      PgDatabaseSingleton.getInstance(),
    );
    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
      PgDatabaseSingleton.getInstance()
    );
    private readonly logger: ILogger = new NestLogger();

  private findOneTrainerService: IService<FindOneTrainerRequest, FindOneTrainerResponse>;
  private followTrainerService: IService<FollowTrainerRequest, FollowTrainerResponse>;
  private findAllTrainersService: IService<GetAllTrainersRequest, GetAllTrainersResponse>;

  constructor() {
    this.findOneTrainerService = new ExceptionLoggerDecorator(
      new FindOneTrainerService(
        this.trainerRepository,
        //this.transactionHandler
      ),
      this.logger
    );
    this.followTrainerService = new ExceptionLoggerDecorator(
      new ServiceDBLoggerDecorator(
        new FollowTrainerService(
          this.trainerRepository,
          //this.transactionHandler
        ),
        this.auditRepository
      ),
      this.logger
    );
   /* this.findAllTrainersService = new ExceptionLoggerDecorator(
      new ServiceDBLoggerDecorator(
        new FindAllTrainersService(
          this.trainerRepository,
          this.transactionHandler
        ),*/
  }

  @Get('one/:id')
  @ApiCreatedResponse({
    description: 'se encontro un entrenador con esa id',
    type: OrmTrainerEntity,
  })
  @ApiBadRequestResponse({
    description: 'No se pudo encontrar un entrenador con esa id. Intente de nuevo'
  })
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado, no se pudo encontrar el token',
  })
  async getTrainerById(@Param('id', ParseUUIDPipe) trainerId: string) {
    const request = new FindOneTrainerRequest(trainerId);
    const oneTrainer = await this.findOneTrainerService.execute(request);
    if (!oneTrainer.isSuccess) {
      // throw new HttpException(oneTrainer.Message, oneTrainer.StatusCode);
      throw ExceptionMapper.toHttp(oneTrainer.Error);
    }
    return oneTrainer.Value;
  }
  

  @Post('/toggle/follow/:id')
  @ApiCreatedResponse({
    description: 'Ahora sigues a este entrenador',
    type: OrmTrainerEntity,
  })
  @ApiBadRequestResponse({
    description: 'No puedes seguir a este entrenador. Intente de nuevo'
  })
  @ApiParam({name:'trainer', required: true})
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado, no se pudo encontrar el token',
  })
  @UseGuards(JwtAuthGuard)
  async followTrainer(
    @Request() req: JwtRequest,
    @Param('id', ParseUUIDPipe) idTrainer: string,
  ) {
    const request = new FollowTrainerRequest(idTrainer, req.user.tokenUser.id);
    const follow = await this.followTrainerService.execute(request);
    if (!follow.isSuccess) {
      // throw new HttpException(follow.Message, follow.StatusCode);
      throw ExceptionMapper.toHttp(follow.Error);
    }
    return follow.Value;
  }


  @Get('/trainer/many')
  @ApiQuery({name: 'filter', required:false})
  @ApiCreatedResponse({
    description: 'se retorno la totalidad de entrenadores',
    type: OrmTrainerEntity,
  })
  @ApiBadRequestResponse({
    description: 'No se encontraron entrenadores.'
  })
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado, no se pudo encontrar el token',
  })
  @UseGuards(JwtAuthGuard)
  async getAllTrainers(@Query() GetManyTrainerQueryDto: GetManyTrainerQueryDto, @GetUser() user: User) {
    const request = new GetAllTrainersRequest(
      GetManyTrainerQueryDto.userfollow,
      user.Id,
      GetManyTrainerQueryDto.page,  
      GetManyTrainerQueryDto.perpage);
    const result = await this.findAllTrainersService.execute(request);
    
    if (result.isSuccess)
    {
      return result.Value;
    } else {
      // throw new HttpException(result.Message, result.StatusCode);
    }
    
  }
   

}


