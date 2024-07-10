import { Notify } from "src/notify/notify/domain/notify";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";
import { NotifyEntity } from "../../Infraestructure/entities/notify.entity";
import { IService } from "src/common/application/interfaces/IService";


// export class CreateNotify implements IService<>{
//     private readonly repository: INotifyRepository;

//     constructor(repository: INotifyRepository) {
//         this.repository = repository;
//     }

//     get name(): string {
//         return this.constructor.name;
//     }

//     async execute(notify: Notify): Promise<Result<Notify>> {
//         try {
//             const notifyCreated = await this.repository.saveNotify(notify);
//             if(!notifyCreated.isSuccess) {
//                 return Result.fail<Notify>(notifyCreated.Error)
//             }
//             return Result.success<Notify>(notifyCreated.Value);
//         } catch (error) {
//             return Result.fail(error);
//         }
//     }
// }