import { Result } from 'src/common/domain/result-handler/result';

export interface IApplicationService<D, R> {
  execute(value: D): Promise<Result<R>>;

  get name(): string;
}
