import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyEntity } from './Infraestructure/entities/notify.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NotifyEntity])]
})
export class NotifyModule {}
