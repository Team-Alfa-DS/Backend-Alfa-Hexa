import { Body, Controller, Request, Get, Param, ParseUUIDPipe} from "@nestjs/common";
import { OrmNotifyRepository } from "../repository/orm-notify.repository";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { NotifyMapper } from "../mappers/notify-mapper";
import { get } from "http";
import { getfindNotifyById } from "../../application/service/getfindNotifyById";
import { GetAllNotify } from "../../application/service/GetAllnotify";
import { notifycountnotreaded } from "../../application/service/notify-countnotreaded";


@Controller('notify')
export class notifycontroller{
    private readonly getfindNotifyById: getfindNotifyById;
    private readonly GetAllNotify: GetAllNotify;
    private readonly notifycountnotreaded: notifycountnotreaded;

constructor(){
    const repositoryinstance = new OrmNotifyRepository(DatabaseSingleton.getInstance(), new NotifyMapper());
    this.getfindNotifyById = new getfindNotifyById(repositoryinstance);
    this.GetAllNotify = new GetAllNotify(repositoryinstance);
    this.notifycountnotreaded = new notifycountnotreaded(repositoryinstance);
}

@Get('one/:id')
GetfindNotifyById(@Param('id', ParseUUIDPipe) id: string){
    return this.getfindNotifyById.execute(id);
}

@Get('all')
getAllNotify(@Request() req){
    return this.GetAllNotify.execute();
}

@Get('count')
countNotReaded(@Request() req){
    return this.notifycountnotreaded.execute();
}
}