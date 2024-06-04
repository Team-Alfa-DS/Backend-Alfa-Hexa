import { IService, ServiceRequestDto, ServiceResponseDto} from "./IService";

export abstract class IServiceDecorator<I extends ServiceRequestDto, O extends ServiceResponseDto> implements IService<I, O> {
  protected readonly decoratee: IService<I, O>;

  constructor(decoratee: IService<I, O>) {
    this.decoratee = decoratee;
  }

  get name() {
    return this.decoratee.constructor.name;
  }
  abstract execute(input: I): Promise<O>;
}