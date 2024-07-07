import { Result } from 'src/common/domain/result-handler/result';
 import { ITrainerRepository } from 'src/trainer/domain/repositories/trainer-repository.interface';
 import { Trainer } from 'src/trainer/domain/trainer';
 import { IApplicationService } from '../application-service/application-service.interface';
 import { IService } from 'src/common/application/interfaces/IService';
 import { IUserRepository } from 'src/user/domain/repositories/user-repository.interface';
 import { ServiceRequestDto } from 'src/common/application/interfaces/IService';
 import { ServiceResponseDto } from 'src/common/application/interfaces/IService';
import  { User } from 'src/user/domain/user';
import { UserId } from 'src/user/domain/value-objects/user-id';
import { TransactionHandler } from 'src/common/infraestructure/database/transaction-handler';
import { ITransactionHandler } from 'src/common/domain/transaction-handler/transaction-handler.interface';

 export class FindAllTrainersService extends  IService<GetAllTrainersRequest, GetAllTrainersResponse>{
constructor(
    private readonly trainerRepository: ITrainerRepository,
    private readonly transactionHandler: ITransactionHandler
){super()}

async execute(request: GetAllTrainersRequest): Promise<Result<GetAllTrainersResponse>> {
    const trainersResult = await this.trainerRepository.findAllTrainers(
      request.userFollow, // Pasar el nuevo filtro
      request.user.Id,
      request.page,
      request.perpage,
    );
    if(trainersResult.isSuccess){
        const trainersresponse: {
            id: string;
            name: string;
            followers: number;
            userFollow: boolean;
            location: string;
            //courses: string[];
            //blogs: string[];
            //users: string[];
        }[] = [];

        //let user: Result<User>;
        for(let trainer of trainersResult.Value){
           /* const userIds = trainer.User.map(userFollowerUserId => userFollowerUserId.trainerFollowerUserId.Id);
            if(!user.isSuccess){
                return Result.fail(user.Error, user.StatusCode, user.Message);
            }*/
            trainersresponse.push({
                id: trainer.Id.trainerId,
                name: trainer.Name.trainerName,
                followers: trainer.Followers.trainerFollower,
                userFollow: trainer.User.map(user => user.trainerFollowerUserId.Id).includes(request.user.Id),
                location: trainer.Location.trainerLocation,
                //courses: trainer.Courses.map(course => course.trainerCourseId.Value),
               // blogs: trainer.Blogs.map(blog => blog.trainerBlogId.value),
                //users: trainer.User.map(user => user.trainerFollowerUserId.Id)
            });
            return Result.success(new GetAllTrainersResponse(trainersresponse), 200);
        }
    }
}

 }

 export class GetAllTrainersRequest implements ServiceRequestDto {
    readonly userFollow?: boolean;
    readonly user?: UserId;
    readonly page?: number;
    readonly perpage?: number;
     // Nuevo campo para el filtro
  
    constructor(userFollow?: boolean,user?: UserId, page?: number, perpage?: number ) {
      this.userFollow = userFollow;
      this.user = user;
      this.page = page;
      this.perpage = perpage;
      
    }

    dataToString(): string {
        return `Query: user:${this.user}  | page: ${this.page} | perpage: ${this.perpage} }`;
      }
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

    constructor(trainers: {
        id: string;
        name: string;
        followers: number;
        userFollow: boolean;
        location: string;
        //courses: string[];
        //blogs: string[];
        //users: string[];
    }[]){
        this.trainers = trainers
    }
    dataToString(): string {
        return `GetAllTrainersResponse: ${JSON.stringify(this)}`
    }
 }


