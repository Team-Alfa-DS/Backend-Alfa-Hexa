import { Blog } from "../Blog";


export interface IBlogRepository {

    getAllBLogs(): Promise<Blog[]>;

    getBlogById(id: string): Promise<Blog>;
}