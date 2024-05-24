import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmTrainer } from './entities/trainer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrmTrainer])],
})
export class TrainerModule {}
