import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DatabaseSingleton } from 'src/common/infraestructure/database/database.singleton';
import { FindOneTrainerService } from 'src/trainer/application/service/findOneTrainer.service';
import { OrmTrainerMapper } from '../mapper/orm-trainer.mapper';
import { OrmTrainerRepository } from '../repositories/orm-trainer.repositorie';
import { FollowTrainerService } from 'src/trainer/application/service/followTrainer.service';
import { JwtRequest } from 'src/common/infraestructure/types/jwt-request.type';
import { JwtAuthGuard } from 'src/auth/infraestructure/guards/jwt-guard.guard';

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

  private findOneTrainerService: FindOneTrainerService;
  private followTrainerService: FollowTrainerService;

  constructor() {
    this.findOneTrainerService = new FindOneTrainerService(
      this.trainerRepository,
      //this.transactionHandler
    );
    this.followTrainerService = new FollowTrainerService(
      this.trainerRepository,
      //this.transactionHandler
    );
  }

  @Get('one/:id')
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado, no se pudo encontrar el token',
  })
  async getTrainerById(@Param('id', ParseUUIDPipe) trainerId: string) {
    const oneTrainer = await this.findOneTrainerService.execute(trainerId);
    if (!oneTrainer.isSuccess) {
      return oneTrainer;
    }
    return oneTrainer.Value;
  }

  @Post('/toggle/follow/:id')
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado, no se pudo encontrar el token',
  })
  @UseGuards(JwtAuthGuard)
  async followTrainer(
    @Request() req: JwtRequest,
    @Param('id', ParseUUIDPipe) idTrainer: string,
  ) {
    const data = {
      idTrainer: idTrainer,
      idUser: req.user.tokenUser.id,
    };
    const follow = await this.followTrainerService.execute(data);
    if (!follow.isSuccess) {
      return follow;
    }
    return follow;
  }
}
