import { Result } from "src/common/domain/result-handler/result";
import { IService, ServiceRequestDto, ServiceResponseDto } from "../interfaces/IService";
import { IServiceDecorator } from "../interfaces/IServiceDecorator";

export class ExceptionLoggerDecorator<I extends ServiceRequestDto, O extends ServiceResponseDto> extends IServiceDecorator<I, O> {

  constructor(decoratee: IService<I, O>) {
    super(decoratee);
  }

  async execute(input: I): Promise<Result<O>> {
    const r = await this.decoratee.execute(input);

    if (!r.isSuccess) {// Adaptar esto a loggear por texto no es tan complejo, me parece raro que sea solo loggear por consola
      console.log(`Error al llamar el servicio: ${this.decoratee.name} | Error: ${r.Message}, Code: ${r.StatusCode}  | Input: ${input.dataToString()}`);
    }

    return r;
  }

  
}