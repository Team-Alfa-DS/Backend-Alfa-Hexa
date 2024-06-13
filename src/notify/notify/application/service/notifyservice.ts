/*import { Notify } from "src/notify/notify/domain/notify";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";
import { TokenRepository } from "../../domain/repositories/token-repository.interface";
import { Token } from "../../Infraestructure/entities/token.entity";
import { NotifierDto } from "src/common/application/notification-handler/dto/entry/entry";
//import { FirebaseNotifier } from "src/common/infraestructure/Firebase-notification/firebase-notification";


export class NotifierServiceSave implements IApplicationService<any, Token>{

private readonly repository: TokenRepository;


constructor(repository: TokenRepository){
    this.repository = repository;
}

get name(): string{
    return 'NotifierService'
}

async execute(token: Token): Promise<Result<any>>{
    const result = await this.repository.savetoken(token);
    return result;
}
}*/

