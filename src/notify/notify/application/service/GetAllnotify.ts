// import { Notify } from "src/notify/notify/domain/notify";
// import { IApplicationService } from "../application-service/application-service.interface";
// import { Result } from "src/common/domain/result-handler/result";
// import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";
// import { error } from "console";
// import { IService, ServiceResponseDto } from "src/common/application/interfaces/IService";

// export class GetAllNotify implements IService<GetAllNotificationsRequest, GetAllNotificationsResponse> {
//     private readonly repository: INotifyRepository;

//     constructor(repository: INotifyRepository) {
//         this.repository = repository;
//     }

//     get name(): string {
//         return 'GetAllNotify';
//     }

//     async execute(request: GetAllNotificationsRequest): Promise<Result<GetAllNotificationsResponse>> {
//         try {
//             const result = await this.repository.getAllNotify();
//             if (!result.isSuccess) {
//                 return Result.fail<Notify[]>(result.Error);
//             }
//             return Result.success<Notify[]>(result.Value);
//         } catch(err) {
//             return Result.fail<Notify[]>(err);
//         }
//     }
// }

// export class GetAllNotificationsRequest implements ServiceResponseDto {
    
    
//     dataToString(): string {
//         return `GetAllNotificationsRequest: {}`
//     }
    
// }

// export class GetAllNotificationsResponse implements ServiceResponseDto {
//     dataToString(): string {
//         throw new Error("Method not implemented.");
//     }

// }