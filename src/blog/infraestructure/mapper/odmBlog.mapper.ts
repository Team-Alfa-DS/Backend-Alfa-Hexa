
import { Blog } from "src/blog/domain/Blog";
import { BlogContent } from "src/blog/domain/valueObjects/blogContent";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { BlogImage } from "src/blog/domain/valueObjects/blogImage";
import { BlogPublicationDate } from "src/blog/domain/valueObjects/blogPublicationDate";
import { BlogTag } from "src/blog/domain/valueObjects/blogTag";
import { BlogTitle } from "src/blog/domain/valueObjects/blogTitle";
import { Category } from "src/category/domain/Category";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { OdmBlogEntity } from "../entities/odm-entities/odm-blog.entity";

interface BlogFromODM {
    id: string;
    name: string;
    content: string;
    date: Date;
    trainer: string;
    category:string;
    tag_id: string,
    images: string[],
    comments: string[]

    
}

export class OdmBlogMapper {
    static toDomain(blog: OdmBlogEntity): Blog {
        return new Blog(
            BlogId.create(blog.id),
            BlogTitle.create(blog.title),
            BlogContent.create(blog.description),
            BlogPublicationDate.create(blog.publication_date),
            [],
            CategoryId.create(blog.category.id),
            TrainerId.create(blog.trainer.id),
            blog.tags.map((tag) => BlogTag.create(tag.name)),
            blog.images.map((image) => BlogImage.create(image.url))

        );
    }
    
}
