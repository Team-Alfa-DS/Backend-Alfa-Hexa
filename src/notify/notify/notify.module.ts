import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyEntity } from './Infraestructure/entities/notify.entity';
import { notifycontroller } from './Infraestructure/controller/notify.controller';
import { getfindNotifyById } from './application/service/getfindNotifyById';
import { notifycountnotreaded } from './application/service/notify-countnotreaded';
import { GetAllNotify } from './application/service/GetAllnotify';

@Module({
    imports: [TypeOrmModule.forFeature([NotifyEntity])],
    controllers: [notifycontroller],
    providers: [getfindNotifyById, notifycountnotreaded, GetAllNotify]
})
export class NotifyModule {}
