import { IService, TService } from "../interfaces/IService";
import { IServiceDecorator } from "../interfaces/IServiceDecorator";
import { IAsyncLogger } from "../ports/IAsyncLogger";

export class ServiceLoggerDecorator<O> extends IServiceDecorator<O> {
  private logger: IAsyncLogger;

  constructor(decoratee: IService<TService, O>, logger: IAsyncLogger) {
    super(decoratee);
    this.logger = logger;
  }

  execute(service: TService): O {
    this.logger.writeToLog("Service: " + service.toString() + " |Time: " + new Date());

    return this.decoratee.execute(service);
  }
}