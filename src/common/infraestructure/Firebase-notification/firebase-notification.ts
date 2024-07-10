import * as admin from 'firebase-admin';
import { Inject, Injectable } from '@nestjs/common';
import { NotifierDto } from 'src/common/application/notification-handler/dto/entry/entry';
import { NotifierResponse } from 'src/common/application/notification-handler/dto/response/response';
import { INotifier } from 'src/common/application/notification-handler/notification-interface';
import { Result } from 'src/common/domain/result-handler/result';
import { MulticastMessage} from 'firebase-admin/lib/messaging/messaging-api';
import { OrmNotifyRepository } from 'src/notify/notify/Infraestructure/repository/orm-notify.repository';
import { error } from 'console';


@Injectable()
export class FirebaseNotifier implements INotifier {

    constructor(
        @Inject(OrmNotifyRepository) 
        private readonly notifyrepository: OrmNotifyRepository){
    }

    async notify(token: string): Promise<Result<NotifierDto>> {
        try{
        const message: MulticastMessage = {
            notification: {
                title: 'Nuevo mensaje',
                body: 'Tienes un nuevo mensaje en tu bandeja de entrada'
            },
            tokens: [token]
        };
        const response = await admin.messaging().sendMulticast(message)
    } catch (error) {

        return Result.fail<NotifierDto>(error);  
    }
}
}