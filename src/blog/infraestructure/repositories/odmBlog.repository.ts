import { Blog } from "src/blog/domain/Blog";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { Result } from "src/common/domain/result-handler/result";
import { OdmBlogEntity } from '../entities/odm-entities/odm-blog.entity';
import { Model } from "mongoose";
import { OdmBlogMapper } from "../mapper/odmBlog.mapper";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";

export class OdmBlogRepository implements IBlogRepository{
    constructor(private odmBlogMapper: OdmBlogMapper, private blogModel: Model<OdmBlogEntity >) {
        
    }

   async  getAllBLogs(page: number=0, perpage: number=5, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>> {
        try {
            const blogs = await this.blogModel.find();
            console.log(blogs[0])
            if(!blogs) return Result.fail(new Error('Blogs not found'));
            let domainBlogs = blogs.map(blog => OdmBlogMapper.toDomain({
                id: blog.id,
                name: blog.title,
                content: blog.description,
                date: blog.date,
                trainer: blog.trainer_id,
                category: blog.category_id,
                tag_id: blog.tag_id,
                images: blog.images,
                comments: blog.comments
            
            }));

        
        if (category){
            domainBlogs = domainBlogs.filter(blog => blog.Category.equals(CategoryId.create(category)));
        }

        if (trainer){
            domainBlogs = domainBlogs.filter(blog => blog.Trainer.equals(TrainerId.create(trainer)));
        }

        const filteredBlogs: Blog[] = [];
        if(filter && filter.length > 0){
            domainBlogs = domainBlogs.filter(blog => blog.Tag.value.toLowerCase().includes(filter.toLowerCase()));
        }

        const blogsResponse = domainBlogs.slice(page * perpage, page * perpage + perpage)
        return Result.success(blogsResponse);

       } catch (error) {
            console.log(error);
            return Result.fail(error); 
       }
        
    }
    getBlogById(id: string): Promise<Result<Blog>> {
        throw new Error("Method not implemented.");
    }
    getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>> {
        throw new Error("Method not implemented.");
    }
    
}