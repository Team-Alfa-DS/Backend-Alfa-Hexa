/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Request, Get, Param, ParseUUIDPipe, Post, UseGuards, Headers} from "@nestjs/common";
import { OrmNotifyRepository } from "../repository/orm-notify.repository";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { NotifyMapper } from "../mappers/notify-mapper";
import { get } from "http";
import { getfindNotifyById } from "../../application/service/getfindNotifyById";
import { GetAllNotify } from "../../application/service/GetAllnotify";
import { notifycountnotreaded } from "../../application/service/notify-countnotreaded";
import { NotifierDto } from "src/common/application/notification-handler/dto/entry/entry";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
/*import { TokenRepository } from "../../domain/repositories/token-repository.interface";*/
import { TokenDto } from "../dto/saveToken.dto";
import { NotifierServiceSend } from "../../application/service/sendNotification";
import { FirebaseNotifier } from "src/common/infraestructure/Firebase-notification/firebase-notification";
import { CreateNotify } from "../../application/service/createNotify";
import { createNotificaciondto } from "../dto/createnotify.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { NotifyEntity } from "../entities/notify.entity";


@ApiTags('Notify')
@Controller('notify')
export class notifycontroller{
   /* private readonly tokenrepository: TokenRepository;*/
    private readonly notifyrepository: OrmNotifyRepository;
    private readonly getfindNotifyById: getfindNotifyById;
    private readonly GetAllNotify: GetAllNotify;
    private readonly notifycountnotreaded: notifycountnotreaded;
    private readonly notifierServiceSend: NotifierServiceSend;
    private readonly createNotify: CreateNotify;

constructor(){
    const repositoryinstance = new OrmNotifyRepository(DatabaseSingleton.getInstance(), new NotifyMapper());
    this.getfindNotifyById = new getfindNotifyById(repositoryinstance);
    this.GetAllNotify = new GetAllNotify(repositoryinstance);
    this.notifycountnotreaded = new notifycountnotreaded(repositoryinstance);
    this.createNotify = new CreateNotify(repositoryinstance);
    this.notifierServiceSend = new NotifierServiceSend(new FirebaseNotifier(repositoryinstance));
}

@Get('one/:id')
@ApiCreatedResponse({
    description: 'se retorno la notificacion correctamente',
    type: NotifyEntity,
})
@ApiBadRequestResponse({
    description: 'No se pudo retornar la notificacion. Intente de nuevo'
})
GetfindNotifyById(@Param('id', ParseUUIDPipe) id: string){
    return this.getfindNotifyById.execute(id);
}

@Get('all')
@ApiCreatedResponse({
    description: 'se retornaron todas las notificaciones correctamente',
    type: NotifyEntity,
})
@ApiBadRequestResponse({
    description: 'No posee notificaciones que retornar. Intente de nuevo'
})
getAllNotify(@Request() req){
    return this.GetAllNotify.execute();
}

@Get('count')
@ApiCreatedResponse({
    description: 'se retorno la cuenta de notificaciones',
    //type: NotifyEntity,
})
@ApiBadRequestResponse({
    description: 'No se pudo contar las notificaciones. Intente de nuevo'
})
countNotReaded(@Request() req){
    return this.notifycountnotreaded.execute();
}
/*
@Post('place-notify')
CreateNotify(@Request() req,  @Body() notify: createNotificaciondto) {
    return this.createNotify.execute(notify);
}
*/

@UseGuards(JwtAuthGuard)
@Post('savetoken')
@ApiCreatedResponse({
    description: 'Se guardo el token correctamente',
    //type: NotifyEntity,
})
@ApiBadRequestResponse({
    description: 'No se pudo guardar el token'
})
savetoken(@Request() req, @Body() data: TokenDto, @Headers('Authorization') token: string){
    token = token.replace('Bearer', '');    
    return this.notifierServiceSend.execute(token);
}
}