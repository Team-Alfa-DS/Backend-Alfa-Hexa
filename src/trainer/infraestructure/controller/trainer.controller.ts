import { Controller, Get, Param } from '@nestjs/common';
import { OrmTrainerRepository } from '../repositories/orm-trainer.repositorie';
//import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { DatabaseSingleton } from 'src/common/infraestructure/database/database.singleton';
import { OrmTrainerMapper } from '../mapper/orm-trainer.mapper';
import { FindOneTrainerService } from 'src/trainer/application/service/findOneTrainer.service';
//import { UpdateUserDto } from "../dtos/update-user.dto";
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({
  description: 'Acceso no autorizado, no se pudo encontrar el Token',
})
@Controller('user')
export class TrainerController {
  private trainerMapper: OrmTrainerMapper = new OrmTrainerMapper();
  private readonly trainerRepository: OrmTrainerRepository =
    new OrmTrainerRepository(
      this.trainerMapper,
      DatabaseSingleton.getInstance(),
    );

  /*private transactionHandler = new TransactionHandler(
        DatabaseSingleton.getInstance().createQueryRunner()
    );*/
  private findOneTrainerService: FindOneTrainerService;

  constructor() {
    this.findOneTrainerService = new FindOneTrainerService(
      this.trainerRepository,
      //this.transactionHandler
    );
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    //const oneBlog = this.findOneTrainerService.execute(id);
    return 'Hola';
  }
}
