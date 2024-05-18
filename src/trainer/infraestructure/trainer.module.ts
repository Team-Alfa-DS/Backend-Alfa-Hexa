import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Trainer])]
})
export class TrainerModule {}
