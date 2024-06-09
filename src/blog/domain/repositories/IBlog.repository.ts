import { Blog } from "../Blog";
import { Result } from '../../../common/domain/result-handler/result';


export interface IBlogRepository {

    getAllBLogs(): Promise<Result<Blog[]>>;

    getBlogById(id: string): Promise<Result<Blog>>;
}