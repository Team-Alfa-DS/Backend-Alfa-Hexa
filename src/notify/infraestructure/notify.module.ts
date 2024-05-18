import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notify } from './entities/notify.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notify])]
})
export class NotifyModule {}
