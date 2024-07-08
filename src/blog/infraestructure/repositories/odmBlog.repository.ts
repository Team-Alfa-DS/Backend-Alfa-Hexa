import { Blog } from "src/blog/domain/Blog";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { Result } from "src/common/domain/result-handler/result";
import { OdmBlogEntity } from '../entities/odm-entities/odm-blog.entity';
import { Model } from "mongoose";
import { OdmBlogMapper } from "../mapper/odmBlog.mapper";

export class OdmBlogRepository implements IBlogRepository{
    constructor(private odmBlogMapper: OdmBlogMapper, private blogModel: Model<OdmBlogEntity >) {
        
    }

   async  getAllBLogs(): Promise<Result<Blog[]>> {
        try {
            const blog = await this.blogModel.find();
            throw new Error("Method not implemented.");
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getBlogById(id: string): Promise<Result<Blog>> {
        throw new Error("Method not implemented.");
    }
    getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>> {
        throw new Error("Method not implemented.");
    }
    
}