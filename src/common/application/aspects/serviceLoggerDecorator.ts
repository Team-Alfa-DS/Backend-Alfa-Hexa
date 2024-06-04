import { IService, ServiceRequestDto, ServiceResponseDto } from "../interfaces/IService";
import { IServiceDecorator } from "../interfaces/IServiceDecorator";
import { IAsyncLogger } from "../ports/IAsyncLogger";

export class ServiceLoggerDecorator<I extends ServiceRequestDto, O extends ServiceResponseDto> extends IServiceDecorator<I, O> {
  private logger: IAsyncLogger;
  

  constructor(decoratee: IService<I, O>, logger: IAsyncLogger) {
    super(decoratee);
    this.logger = logger;
  }

  async execute(service: I): Promise<O> {
    let r: O = await this.decoratee.execute(service);

    this.logger.writeToLog("Time: " + new Date() + " | Service: " + this.decoratee.constructor.name + " | InputData: "+ service.dataToString() + " | ResponseData: " + r.dataToString());

    return r;
  }
}