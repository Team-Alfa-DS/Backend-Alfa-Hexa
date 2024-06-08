import { Result } from '../domain/result-handler/result';


export interface IApplicationService<D, R> {
    
    execute(value: D): Promise<Result<R>>;

}