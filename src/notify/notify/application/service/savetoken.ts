import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { NotifierDto } from "src/common/application/notification-handler/dto/entry/entry";
import { FirebaseNotifier } from "src/common/infraestructure/Firebase-notification/firebase-notification";
import { TokenRepository } from "../repository/tokenRepository";
import { TokenEntity } from "../../Infraestructure/entities/token.entity";


export class NotifierServiceSave {

private readonly repository: TokenRepository;


constructor(repository: TokenRepository){
    this.repository = repository;
}

get name(): string{
    return 'NotifierService'
}

async execute(token: string, user: string): Promise<Result<void>>{
    const result = await this.repository.savetoken(token, user);
    return result;
}
}

