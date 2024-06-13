import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { DatabaseSingleton } from 'src/common/infraestructure/database/database.singleton';
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
import { OrmTrainer } from '../entities/trainer.entity';

@ApiTags('Trainer')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({
  description: 'Acceso no autorizado, no se pudo encontrar el Token',
})
@Controller('trainer')
export class TrainerController {
  private trainerMapper: OrmTrainerMapper = new OrmTrainerMapper();
  private readonly trainerRepository: OrmTrainerRepository =
    new OrmTrainerRepository(
      this.trainerMapper,
      DatabaseSingleton.getInstance(),
    );
    private readonly auditRepository: OrmAuditRepository = new OrmAuditRepository(
      DatabaseSingleton.getInstance()
    );

  private findOneTrainerService: IService<FindOneTrainerRequest, FindOneTrainerResponse>;
  private followTrainerService: IService<FollowTrainerRequest, FollowTrainerResponse>;

  constructor() {
    this.findOneTrainerService = new ServiceDBLoggerDecorator(
      new FindOneTrainerService(
        this.trainerRepository,
        //this.transactionHandler
      ),
      this.auditRepository
    );
    this.followTrainerService = new ServiceDBLoggerDecorator(
      new FollowTrainerService(
        this.trainerRepository,
        //this.transactionHandler
      ),
      this.auditRepository
    );
  }

  @Get('one/:id')
  @ApiCreatedResponse({
    description: 'se encontro un entrenador con esa id',
    type: OrmTrainer,
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
      throw new HttpException(oneTrainer.Message, oneTrainer.StatusCode);
    }
    return oneTrainer.Value;
  }

  @Post('/toggle/follow')
  @ApiCreatedResponse({
    description: 'Ahora sigues a este entrenador',
    type: OrmTrainer,
  })
  @ApiBadRequestResponse({
    description: 'No puedes seguir a este entrenador. Intente de nuevo'
  })
  @ApiQuery({name:'trainer', required: false})
  @ApiQuery({name:'user', required: false})
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado, no se pudo encontrar el token',
  })
  async followTrainer(
    @Query('trainer', ParseUUIDPipe) idTrainer: string,
    @Query('user', ParseUUIDPipe) idUser: string,
  ) {
    /*if ((idTrainer || idUser) === undefined) {
      return Result.fail(new Error('Try Again'), 404, 'Try Again');
    }*/
    const request = new FollowTrainerRequest(idTrainer, idUser);
    const follow = await this.followTrainerService.execute(request);
    if (!follow.isSuccess) {
      throw new HttpException(follow.Message, follow.StatusCode);
    }
    return follow.Value;
  }
}
