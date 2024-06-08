import { Result } from "src/common/domain/result-handler/result";
import { IService, ServiceRequestDto, ServiceResponseDto } from "../interfaces/IService";
import { IServiceDecorator } from "../interfaces/IServiceDecorator";
import { IAuditRepository } from "../repositories/audit.repository";

export class ServiceDBLoggerDecorator<I extends ServiceRequestDto, O extends ServiceResponseDto> extends IServiceDecorator<I,O> {
    private logger: IAuditRepository;

    constructor(decoratee: IService<I, O>, logger: IAuditRepository) {
        super(decoratee);
        this.logger = logger;
    }

    async execute(service: I): Promise<Result<O>> {
        let r = await this.decoratee.execute(service);

        if (r.isSuccess) {
            await this.logger.saveLog("Time: " + new Date() + " | Service: " + this.decoratee.constructor.name + " | InputData: "+ service.dataToString() + " | ResponseData: " + r.Value.dataToString());
        }

        return r;
    }

}