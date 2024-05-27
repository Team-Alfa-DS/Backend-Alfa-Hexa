import { IService, TService } from "./IService";

export abstract class IServiceDecorator<O> implements IService<TService, O> {
  protected decoratee: IService<TService, O>;

  constructor(decoratee: IService<TService, O>) {
    this.decoratee = decoratee;
  }
  abstract execute(input: TService): O;
}