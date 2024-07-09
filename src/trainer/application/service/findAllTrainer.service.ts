import { Result } from 'src/common/domain/result-handler/result';
 import { IService } from 'src/common/application/interfaces/IService';
 import { ServiceRequestDto } from 'src/common/application/interfaces/IService';
 import { ServiceResponseDto } from 'src/common/application/interfaces/IService';
import { ITransactionHandler } from 'src/common/domain/transaction-handler/transaction-handler.interface';
import { IOdmTrainerRepository } from 'src/trainer/domain/repositories/odm-trainer-repository.interface';
import { UserId } from 'src/user/domain/value-objects/user-id';

export class FindAllTrainersService extends  IService<GetAllTrainersRequest, GetAllTrainersResponse>{
    constructor(
        private readonly trainerRepository: IOdmTrainerRepository,
        private readonly transactionHandler: ITransactionHandler
    ){super()}

    async execute(request: GetAllTrainersRequest): Promise<Result<GetAllTrainersResponse>> {
        const trainersResult = await this.trainerRepository.findAllTrainers(
            request.userFollow, // Pasar el nuevo filtro
            request.user,
            request.page,
            request.perpage,
        );

        const trainersList: Trainer[] = []

        for (const trainer of trainersResult.Value) {
            let userFollow = false;
            if (trainer.User.findIndex(user => user.trainerFollowerUserId.equals(UserId.create(request.user))) != -1) userFollow = true
            trainersList.push({id: trainer.Id.trainerId, followers: trainer.Followers.trainerFollower, location: trainer.Location.trainerLocation, name: trainer.Name.trainerName, userFollow})
        }
        
        const response = new GetAllTrainersResponse(trainersList)
        return Result.success(response);
    }
}

 export class GetAllTrainersRequest implements ServiceRequestDto {
    readonly userFollow?: boolean;
    readonly user?: string;
    readonly page?: number;
    readonly perpage?: number;
     // Nuevo campo para el filtro
  
    constructor(userFollow?: boolean, user?: string, page?: number, perpage?: number ) {
      this.userFollow = userFollow;
      this.user = user;
      this.page = page;
      this.perpage = perpage;
      
    }

    dataToString(): string {
        return `GetAllTrainersReq: { user:${this.user}  | page: ${this.page} | perpage: ${this.perpage} }`;
      }
  }

type Trainer = {
    id: string;
    name: string;
    followers: number;
    userFollow: boolean;
    location: string;
}

export class GetAllTrainersResponse implements ServiceResponseDto {
    readonly trainers: {
        id: string;
        name: string;
        followers: number;
        userFollow: boolean;
        location: string;
        //courses: string[];
        //blogs: string[];
        //users: string[];
    }[] = []

    constructor(trainers: Trainer[]){
        this.trainers = trainers
    }
    dataToString(): string {
        return `GetAllTrainersResponse: ${JSON.stringify(this)}`
    }
 }


