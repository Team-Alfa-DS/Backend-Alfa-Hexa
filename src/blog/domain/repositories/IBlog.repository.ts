import { Blog } from "../Blog";
import { Result } from '../../../common/domain/result-handler/result';
import { get } from 'http';


export interface IBlogRepository {

    getAllBLogs(page?: number, perpage?: number, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>>;

    getBlogById(id: string): Promise<Result<Blog>>;

    getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>>;

    getBlogsCount (category?: string, trainer?: string): Promise<Result<number>>;
}