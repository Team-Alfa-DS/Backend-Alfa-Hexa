import { Result } from "src/common/domain/result-handler/result";
import { IService, ServiceRequestDto, ServiceResponseDto} from "./IService";

export abstract class IServiceDecorator<I extends ServiceRequestDto, O extends ServiceResponseDto> implements IService<I, O> {
  protected readonly decoratee: IService<I, O>;

  constructor(decoratee: IService<I, O>) {
    this.decoratee = decoratee;
  }

  get name() {
    return this.decoratee.name;
  }
  abstract execute(input: I): Promise<Result<O>>;
}