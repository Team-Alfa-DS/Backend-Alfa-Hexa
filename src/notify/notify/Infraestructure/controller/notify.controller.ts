import { Body, Controller, Request, Get, Param, ParseUUIDPipe, Post, UseGuards, Headers, Query} from "@nestjs/common";
import { OrmNotifyRepository } from "../repository/orm-notify.repository";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { NotifyMapper } from "../mappers/notify-mapper";
import { get } from "http";
import { getfindNotifyById, getfindNotifyByIdRequest, getfindNotifyByIdResponse } from "../../application/service/getfindNotifyById";
import { GetAllNotify, getAllNotifyRequest, getAllNotifyResponse } from "../../application/service/GetAllnotify";
import { notifycountnotreaded } from "../../application/service/notify-countnotreaded";
import { NotifierDto } from "src/common/application/notification-handler/dto/entry/entry";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
/*import { TokenRepository } from "../../domain/repositories/token-repository.interface";*/
import { TokenDto } from "../dto/saveToken.dto";
/*import { NotifierServiceSend } from "../../application/service/sendNotification";*/
import { FirebaseNotifier } from "src/common/infraestructure/Firebase-notification/firebase-notification";
import { createNotificaciondto } from "../dto/createnotify.dto";
import { IService } from "src/common/application/interfaces/IService";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";
import { NotifyEntity } from "../entities/notify.entity";
import { GetManyNotifyQueryDto } from "src/notify/notify/Infraestructure/dto/getmanyquerydto"
import { Result } from "src/common/domain/result-handler/result";
import { NotifierServiceSave } from "src/notify/notify/application/service/savetoken";



@Controller('notify')
export class notifycontroller{
   /* private readonly tokenrepository: TokenRepository;*/
    private readonly notifyrepository: OrmNotifyRepository;
    private readonly getfindNotifyById: IService<getfindNotifyByIdRequest, getfindNotifyByIdResponse>
    private readonly GetAllNotify: IService<getAllNotifyRequest, getAllNotifyResponse>
    private readonly notifycountnotreaded: notifycountnotreaded;
    //private readonly notifierServiceSend: NotifierServiceSend;
    private readonly savetokenservice: NotifierServiceSave;

constructor(){
    const repositoryinstance = new OrmNotifyRepository(PgDatabaseSingleton.getInstance(), new NotifyMapper());
    this.getfindNotifyById = new getfindNotifyById(repositoryinstance);
    this.GetAllNotify = new GetAllNotify(repositoryinstance);
    this.notifycountnotreaded = new notifycountnotreaded(repositoryinstance);
    //this.notifierServiceSend = new NotifierServiceSend(new FirebaseNotifier(repositoryinstance));
}

@UseGuards(JwtAuthGuard)
  @Get('one/:id')
  @ApiCreatedResponse({
    description: 'se encontro la notificacion correctamente',
    type: NotifyEntity,
  })
  @ApiBadRequestResponse({
    description: 'No se encontro la notificacion  Intente con otra Id'
  })
  async GetfindNotifyById(@Param('id', ParseUUIDPipe) id: string){
    const request = new getfindNotifyByIdRequest(id);
    const result =  await this.getfindNotifyById.execute(request);
    if(result.isSuccess){
        return result.Value;
    }else{
        return result.Error;
    }
}

@Get('many')
 async getAllNotify(@Query() manynotifyquerydto: GetManyNotifyQueryDto){
    const request =  new getAllNotifyRequest(
        manynotifyquerydto.page,
        manynotifyquerydto.perPage
    );
    const result =  await this.GetAllNotify.execute(request);
    if(result.isSuccess){
        return result.Value;
    }
}

@Get('count')
countNotReaded(@Request() req){
    return this.notifycountnotreaded.execute();
}
/*@Post('create')
CreateNotify(@Request() req,  @Body() data: createNotificaciondto) {
    return this.createNotify.execute(data);*/
//}


@UseGuards(JwtAuthGuard)
@Post('savetoken')
savetoken(@Request() req, @Body() data: TokenDto,@Headers('Authorization') user: string){
    return this.savetokenservice.execute(data.token, user);
}
}