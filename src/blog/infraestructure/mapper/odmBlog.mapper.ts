
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
    static toDomain(blog: BlogFromODM): Blog {
        console.log(blog.tag_id)
        return new Blog(
            BlogId.create(blog.id),
            BlogTitle.create(blog.name),
            BlogContent.create(blog.content),
            BlogPublicationDate.create(blog.date),
            blog.comments.map((comment) => BlogCommentId.create(comment)),
            CategoryId.create(blog.category),
            TrainerId.create(blog.trainer),
            BlogTag.create(blog.tag_id),
            blog.images.map((image) => BlogImage.create(image))

        );
    }

    async toPersistence(blog: Blog): Promise<OdmBlogEntity> {
        let odmBlog = OdmBlogEntity.create(
            blog.Id.value,
            blog.Title.value,
            blog.Content.value,
            blog.Publication_date.value,
            blog.Trainer.trainerId,
            blog.Category.value,
            blog.Tag.value,
            blog.Images.map((image) => image.value),
            blog.Comments.map((comment) => comment.commentId)
        );
        return odmBlog;
    }
    
}
