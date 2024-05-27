import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmTrainer } from './entities/trainer.entity';
import { TrainerController } from './controller/trainer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrmTrainer])],
  controllers: [TrainerController],
})
export class TrainerModule {}
